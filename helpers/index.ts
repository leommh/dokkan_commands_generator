import { Filters, Command } from './interfaces';

export const textToCommand:Function = (text:string, filters:Filters) => {
  const { repeats } = filters;

  const splitted = text.split(/\r?\n|\r|\n/g);
  const command:Command = {};
  let lastEvent:string = '';

  for (const item of splitted) {
    const messageRegex = /\[.*\]/i;
    const stageRegex = /\(.*\)/i;

    if (stageRegex.test(item)) {
      if (!command[lastEvent]) continue;

      const stageFullSplit = item.split(' - ');
      const stageSplit = stageFullSplit[0].split('(');
      const stage = stageSplit[0].trim();
      let levels:Array<number> = stageSplit[1].replace(')', '').split(',').map((level:any) => Number(level));
      const levelFinal = Math.max(...levels);

      command[lastEvent].stages.push({
        stage,
        levels,
        levelFinal,
        text: `stage event ${stage}${levelFinal} ${repeats}`
      });
    } else if(messageRegex.test(item)) {
      const eventSplit = item.split(']');
      const type = eventSplit[0].trim().replace('[', '');
      const event = eventSplit[1].trim().replace(']', '');
      lastEvent = event;

      command[event] = {
        type,
        event,
        stages: [],
        text: `{message} Farming event: [${type}] ${event}`,
      };
    };
  }

  return command;
};

export const commandToTxt = (command: Command) => {
  let txt:string = '';

  for (const event of Object.values(command)) {
    txt += `${event.text} \n`;
    
    for (const stage of event.stages) {
      txt += `${stage.text} \n`;
    }
  }

  return txt;
}

export const downloadTxtFile = (command: Command) => {
  const txt:string = commandToTxt(command);
  const element = document.createElement("a");
  const file = new Blob([txt], {
    type: "text/plain"
  });
  element.href = URL.createObjectURL(file);
  element.download = "generated_custom_command.txt";
  document.body.appendChild(element);
  element.click();
};