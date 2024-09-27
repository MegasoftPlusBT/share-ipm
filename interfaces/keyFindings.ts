import { Category } from "./category";

export type KeyFindingsPerCategory = {
  category: Category;
  text: string;
};

export type KeyFindingsPerYear = {
  2024: KeyFindingsPerCategory[];
  2022: KeyFindingsPerCategory[];
  2021: KeyFindingsPerCategory[];
};
