export interface Type {
  name: string;
  checked: boolean;
}

export interface Types {
  [key: string]: Type
}

export interface Filters {
  repeats: number;
  type: Array<Type>;
}

export interface Stage {
  stage: string,
  levels: Array<number>,
  levelFinal: number,
  text: string
}

export interface Event {
  type: string,
  event: string,
  stages: Array<Stage>,
  text: string,
}

export interface Command {
  [key: string]: Event
}