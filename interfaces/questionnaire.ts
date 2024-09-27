import { Category } from "./category";

export type NumberRange = {
  min: number;
  max: number;
};
export type TextOption = {
  option: string;
  value: number;
};
export type NumberRangeOption = {
  option: NumberRange;
  value: number;
};

export type Indicator = {
  text: string;
  textShort: string;
  type: string;
  category: Category;
  options: TextOption[]; // | NumberRangeOption[];
};
export type TextQuestion = Indicator & {
  type: "text";
  options: TextOption[];
};
export type NumberRangeQuestion = Indicator & {
  type: "range";
  options: NumberRangeOption[];
};
export type MethodologyPerCategory = {
  name: string;
  color: string;
  handle: string;
  maxPoints: number;
  about: string;
  indicators: Indicator[];
};
