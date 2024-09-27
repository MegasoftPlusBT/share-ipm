import * as Q from "../../../interfaces/questionnaire";
import { Category } from "../../../interfaces/category";
import { categories } from "./categories";
import data from "../../../data/data.json";
import { MethodOptions } from "googleapis/build/src/apis/abusiveexperiencereport";
import { urlFormatName } from "../../../lib/util";

export function getMaxPoints(indicators: Q.Indicator[]): number {
  const maxPoints = indicators.reduce((acc, curr) => {
    return acc + Math.max(...curr.options.map((o) => o.value));
  }, 0);
  return maxPoints;
}

export function getMaxTotalPoints(): number {
  const indicators = getQuestions();
  return getMaxPoints(indicators);
}

export function getMethodologyPerCategory(): Q.MethodologyPerCategory[] {
  const indicators = getQuestions();
  const methodologyPerCategory = categories.map((category) => {
    const perCategoryIndicators = indicators.filter(
      (i) => i.category.title === category.title
    );
    return {
      name: category.title,
      color: category.color,
      handle: urlFormatName(category.title),
      maxPoints: getMaxPoints(perCategoryIndicators),
      about: category.about,
      indicators: perCategoryIndicators,
    };
  });
  return methodologyPerCategory;
}

export function getQuestions(): Q.Indicator[] {
  let questions: Q.TextQuestion[] = [];
  data.forEach((groupedByCategory) => {
    const about = categories.find(
      (c) => c.title === groupedByCategory.title
    ).about;
    const category: Category = {
      title: groupedByCategory.title,
      color: groupedByCategory.color,
      about: about,
    };
    groupedByCategory.indicators.forEach((questionData) => {
      const options: Q.TextOption[] = questionData.responses.map((r) => {
        return {
          option: r.response,
          value: r.value,
        };
      });

      const question: Q.TextQuestion = {
        text: questionData.title,
        textShort: questionData.titleShort,
        type: "text",
        category,
        options,
      };
      questions.push(question);
    });
  });
  return questions;
}
