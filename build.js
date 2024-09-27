const fs = require('fs');
const nunjucks = require('nunjucks');
const { google } = require('googleapis');
const sheetIds = require('./sheet-ids.json');

main();

async function main () {
//	await saveRawSheetDataAsJson(google, sheetIds);
	//generatePageDataFiles();

	runLocalServer();

	const rawIndicators = require('./data/raw-indicators.json')
		.slice(1); // skipping the first row, because it's the header

	const categoryInfo = rawIndicators.reduce((acc, row) => {
		category = row[0];
		if (acc[category] == null) {
			acc[category] = {
				handle: urlFormatName(row[0]),
				color: '#' + row[1]
			};
		}
		return acc;
	}, {});
	
	const rawMethodologyAbout = require("./data/raw-methodology.json").slice(1);

	const methodologyPerCategory = require("./data/data.json").map(perCategory => ({
		...perCategory,
		category: perCategory.title,
		maxPoints: perCategory.indicators.reduce((sum, indicator) => {
			return sum +
				indicator.responses.reduce((max, response) => Math.max(max, response.value), 0);
		}, 0),
		about: rawMethodologyAbout.filter(row =>
				row[0] === perCategory.title)[0][1].replace('<p>',''),
		color: categoryInfo[perCategory.title].color,
		handle: categoryInfo[perCategory.title].handle,
	}));
	const maxTotalPoints = methodologyPerCategory.reduce((sum, category) => {
		return sum + category.maxPoints;
	}, 0);
	const methodologyData = {
		title: "Metodologija",
		perCategoryData: methodologyPerCategory
	}

	const rawKeyFindingsData = require('./data/raw-key-findings.json');
	const keyFindingsPerCategory = rawKeyFindingsData.slice(1)
		.map((categoryRecommendation) => ({
			category: categoryRecommendation[0],
			handle: categoryInfo[categoryRecommendation[0]].handle,
			color: categoryInfo[categoryRecommendation[0]].color,
			html: categoryRecommendation[1]
		}));
	const keyFindingsData = {
		title: "Važni nalazi",
		perCategoryData: keyFindingsPerCategory
	};
	const rawRecommendationsData = require('./data/raw-recommendations.json');
	const recommendationsDataPerCategory = rawRecommendationsData
		.slice(1)
		.map((categoryRecommendation) => ({
			category: categoryRecommendation[0],
			handle: categoryInfo[categoryRecommendation[0]].handle,
			color: categoryInfo[categoryRecommendation[0]].color,
			html: categoryRecommendation[1]
		}));
	const recommendationsData = {
		title: "Preporuke",
		perCategoryData: recommendationsDataPerCategory
	};
	const mediaInfo = require('./data/raw-media-info.json').slice(1)
		.reduce((acc, row) => {
			media = row[0];
			if (acc[media] == null) {
				acc[media] = {
					title: row[0],
					url: row[1],
					about: row[2],
					highlights: row[3]
				};
			}
			return acc;
		}, {});

	const mediaPoints = require('./data/path.json')
		.map((media, i) => ({
			...media,
			...(mediaInfo[media.name]),
			maxTotalPoints:  maxTotalPoints,
			htmlFileName: urlFormatName(media.name) + '.html',
			rank: i + 1
		})).sort((a, b) => b.total - a.total);
		mediaPoints.forEach((media, i) => {
			if (i > 0) {		
				const prev = mediaPoints[i - 1];
				if (media.total === prev.total) {
					media.rank = prev.rank;
				}
			}
			media.perCategory = [];
			methodologyPerCategory.forEach(category => {
				const pointsPerCategory = media.points.reduce((sum, indicator) => {
					return indicator.category === category.category ?
						sum + indicator.value : sum;
				}, 0);
				let perCategory = {
					name: category.category,
					color: category.color,
					handle: category.handle,
					maxPoints: category.maxPoints,
					points: pointsPerCategory
				};
				perCategory.indicators = [];
				category.indicators.forEach(indicator => {
					const mediaIndicatorResponse =
						media.points.find(response =>
							response.indicator === indicator.titleShort);
					
					//console.log(media.name, mediaIndicatorResponse.value, indicator.responses)
					const selectedIndicatorResponse =
						indicator.responses.find(response =>
							response.value === mediaIndicatorResponse.value);
					const maxValue =
						Math.max(...(indicator.responses.map(x => +x.value)));
					const minValue =
						Math.min(...(indicator.responses.map(x => +x.value)));
					let responseIndicator = {
						name: indicator.title,
						nameShort: indicator.titleShort,
						response: selectedIndicatorResponse.response,
						points: selectedIndicatorResponse.value,
						isMaxResponse: maxValue === +selectedIndicatorResponse.value,
						isMinResponse: minValue === +selectedIndicatorResponse.value,
					}
					perCategory.indicators.push(responseIndicator);
				});
				media.perCategory.push(perCategory);
			});
			media.perCategory.reduce((angleStart, category, i) => {
				const angleEnd = angleStart + category.points * 3.6;
				media.perCategory[i].angleStart = angleStart;
				media.perCategory[i].angleEnd = angleEnd;
				//console.log(media.name, category.name, category.points, angleStart, angleEnd);
				return angleEnd;
			}, 0);
		});
	const top5 = mediaPoints.slice(0,5);

	const navigationItems = [{
		type: "link",
		text: "VAŽNI NALAZI",
		href: "/key-findings.html"
	},{
		type: "dropdown",
		text: "MEDIJI",
		items: mediaPoints.sort((a, b) => {
				if (a.name < b.name) {return -1;}
				if (a.name > b.name) {return 1;}
				else {return 0;}
			}).map(media => ({
				type: "link",
				text: media.name,
				href: "/media/" + media.htmlFileName
			}))
	},{
		type: "link",
		text: "PREPORUKE",
		href: "/recommendations.html"
	},{
		type: "link",
		text: "METODOLOGIJA",
		href: "/methodology.html"
	}];

	const mainPages = [
		{
			template: './templates/index.njk',
			model: {
				title: "IPM",
				navigationItems: navigationItems,
				top_5: top5,
				rankingData: mediaPoints
			},
			output: 'publish/index.html'
		},{
			template: './templates/methodology.njk',
			model: {
				navigationItems: navigationItems,
				...methodologyData
			},
			output: 'publish/methodology.html'
		},{
			template: './templates/recommendations.njk',
			model: {
				navigationItems: navigationItems,
				...recommendationsData
			},
			output: 'publish/recommendations.html'
		},{
			template: './templates/key-findings.njk',
			model: {
				navigationItems: navigationItems,
				...keyFindingsData
			},
			output: 'publish/key-findings.html'
		}
	];
	mainPages.forEach(renderPage);

	// render media pages
	// const mediaPages = mediaPoints.map(media =>
	// 	({
	// 		template: './templates/media.njk',
	// 		model: {
	// 			navigationItems: navigationItems,
	// 			...media
	// 		},
	// 		output: 'publish/media/' + media.htmlFileName
	// 	}));
	// mediaPages.forEach(renderPage);
	generateStyleCss();
}

function renderPage (pageData) {
  	const rendered = nunjucks.render(
		pageData.template,
		pageData.model
  	);
	fs.writeFileSync(pageData.output, rendered);
};
function urlFormatName (mediaName) {
	return mediaName.toLowerCase().replace(/ /g, '-');
};
function getTop5(mediaPoints) {
	let top5 = mediaPoints
		.sort((a, b) => b.total - a.total)
		.slice(0,5)
		.map((media, i) => ({
			name: media.name,
			total: media.total,
			rank: i + 1
		}));
	top5.forEach((media, i) => {
		if (i > 0) {		
			const prev = top5[i - 1];
			if (media.total === prev.total) {
				media.rank = prev.rank;
			}
		}
	});
	return top5;
};
async function authentication (google) {
	const auth = new google.auth.GoogleAuth({
		keyFile: 'credentials.json',
		scopes: 'https://www.googleapis.com/auth/spreadsheets'
	});
	const client = await auth.getClient();
	const sheets = google.sheets({
		version: 'v4',
		auth: client
	});
	return { sheets };
};
async function getSheets (google) {
	try {
		return await authentication(google);
	} catch (err) {
		if (err.code === 'ENOENT') {
			const tutorialUrl = 'https://javascript.plainenglish.io/how-to-use-node-js-with-google-sheets-c256c26e10fc';
			console.log('credentials.json file missing.');
			console.log('To generate credentials.json, follow the instructions in the link: ' + tutorialUrl);
		} else {
			throw err;
		}
	}
};
async function getSheetRows(sheets, sheetId) {
	try {
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId: sheetId,
			range: 'Sheet1'
		});
		return response.data.values;
	} catch (err) {
		console.log("Couldn't read sheet with id: " + sheetId);
		throw err;
	}
};
async function saveRawSheetDataAsJson(google, sheetIds) {
	const { sheets } = await getSheets(google);
	const sheetNames = Object.keys(sheetIds);
	sheetNames.forEach(async sheetName => {
		const sheetRows =  await getSheetRows(sheets, sheetIds[sheetName]);
		fs.writeFileSync(`data/raw-${sheetName}.json`, JSON.stringify(sheetRows));
	});
};
function runLocalServer() {
	const express = require('express')
	const app = express()
	const port = 3000

	app.use(express.static('publish'))

	app.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	});
};

function generateStyleCss () {
	const path = './src/static/style/';
	const cssFiles = [
		'fonts.css',
		'defaults.css',
		'common.css',
		'navbar.css',
		'main.css',
		'footer.css'
	];
	const readOptions = {encoding:'utf8', flag:'r'};
	const cssContent = cssFiles.reduce((output, cssFile) => {
		return output + fs.readFileSync(path + cssFile, readOptions);
	}, '');
	fs.writeFileSync(`./publish/style.css`, cssContent);
};