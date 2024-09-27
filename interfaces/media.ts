import { Indicator, TextOption } from "./questionnaire";

export type IndicatorSelection = {
  indicator: Indicator;
  selected: TextOption;
  selected2022: TextOption;
  selected2024: TextOption;
};

export type Media = {
  name: string;
  selections: IndicatorSelection[];
  total: number;
  total2022: number;
  total2024: number;
};

export type MediaInfo = {
  name: string;
  url: string;
  about: string;
  highlights: string;
  highlights2022: string;
  badges2022: string[];
  highlights2024: string;
  badges2024: string[];
};

export type MediaOutputFormat = {};
