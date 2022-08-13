export interface Filters {
  repeats: number;
  type: Array<object>;
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