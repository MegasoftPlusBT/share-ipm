import data2021 from "../../../data/raw-key-findings.json";
import data2022 from "../../../data/raw-key-findings2022.json";
import data2024 from "../../../data/raw-key-findings2024.json";
import {
  KeyFindingsPerCategory,
  KeyFindingsPerYear,
} from "../../../interfaces/keyFindings";
import { Category } from "../../../interfaces/category";
import { categories } from "./categories";

export const getKeyFindings = () => {
  const kf: KeyFindingsPerYear = {
    "2024": [],
    "2022": [],
    "2021": [],
  };
  categories.forEach((category) => {
    const keyFindings2024 = data2024.find((row) => row[0] === category.title);
    const keyFindings2022 = data2022.find((row) => row[0] === category.title);
    const keyFindings2021 = data2021.find((row) => row[0] === category.title);
    kf["2024"].push({
      category: category,
      text: keyFindings2024[1],
    })
    kf["2022"].push({
      category: category,
      text: keyFindings2022[1],
    });
    kf["2021"].push({
      category: category,
      text: keyFindings2021[1],
    });
  });
  return kf;
};
