import { categories } from "../pages/api/ipm/categories";
import { urlFormatName } from "../lib/util";

const CategoriesAside = () => {
  return (
    <aside id="category-links">
      {categories.map((category) => (
        <a
          key={category.title}
          href={`#${urlFormatName(category.title)}`}
          className=""
        >
          <div
            className="square"
            style={{ backgroundColor: category.color }}
          ></div>
          <span className="category-name">{category.title}</span>
        </a>
      ))}
      <style>
        {`
          /* start main */
          #category-links {
              position: sticky;
              top: calc(50% - 160px);
              margin-left: -34px;
              float: left;
          }
          #category-links a, #category-links a:hover {
              position: relative;
              text-decoration: none;
              display: block;
              height: 60px;
              color: black;
              max-width: max(80vw, 330px);
              padding: 3px;
          }
          #category-links a:hover {
              background-color: white;
          }

          .square {
              width:20px;
              min-width: 20px;
              height: 20px;
              margin-right: 10px;
              display: inline-block;
          }
          .square-with-points {
              width: 95px;
              height: 95px;
              margin-right: 25px;
              display: inline-flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
          }
          .square-with-points .category-max-points {
              border-bottom: 1px solid black;
          }
          .square-with-points div {
              margin-top: 2px;
              font-family: Foundry;
              font-style: normal;
              font-weight: bold;
              font-size: 16px;
              line-height: 120%;
              text-align: right;
              text-transform: uppercase;
          }
          #category-links .category-name {
              display: none;
          }
          #category-links a:hover > .category-name {
              position: absolute;
              display: inline-block;
              font-family: Foundry;
              font-style: normal;
              font-weight: bold;
              font-size: 19px;
              line-height: 22px;
              letter-spacing: 0.15px;
              text-transform: uppercase;
              background: white;
              margin: -3px;
              height: 60px;
              width: 317px;
          }

          .per-category-wrapper {
              padding-top: 25px;
          }
          .per-category-wrapper .html-code-wrapper h3 {
              font-family: FoundryBold;
          }
          .per-category-headline {
              font-family: Foundry;
              font-style: normal;
              font-weight: bold;
              font-size: 33px;
              line-height: 38px;
              display: flex;
              align-items: center;
              letter-spacing: -1px;
              text-transform: uppercase;
          }
          .per-category-headline .square {
              width: 24px;
              height: 24px;
              margin-right: 24px;
              margin-top: -2px;
          }
          .per-category-wrapper ul {
              list-style-type: disc;
              font-size: 20px;
              line-height: 150%;
          }
          .per-category-wrapper ol, .per-category-wrapper h4 {
              font-size: 20px;
              line-height: 150%;
          }
          .per-category-indicators > li {
              font-weight:bold;
          }
          .per-category-indicators > li > * {
              font-weight:normal;
          }
          .per-category-indicator-name {
              font-weight:bold !important;
              margin-top: 20px;
              margin-bottom: 20px;
          }
          /* end main */
        `}
      </style>
    </aside>
  );
};

export default CategoriesAside;
