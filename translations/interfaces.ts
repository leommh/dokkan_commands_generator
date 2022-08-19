export interface TranslationsList {
  [key: string]: Language
};

export interface Language {
  [key: string]: Translation
};

export interface Translation {
  [key: string]: Texts
};

export interface Texts {
  [key: string]: string
};
