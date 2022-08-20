import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Types, Command } from './interfaces';

export const textToCommand:Function = (text:string) => {
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
        levelFinal
      });
    } else if(messageRegex.test(item)) {
      const eventSplit = item.split(']');
      const type = eventSplit[0].trim().replace('[', '');
      const event = eventSplit[1].trim().replace(']', '');
      lastEvent = event;

      command[event] = {
        type,
        event,
        stages: []
      };
    };
  }

  return command;
};

export const commandToTxt = (command: Command, types: Types, repeats:number, difficulty: number) => {
  let txt:string = '';

  for (const event of Object.values(command)) {
    if (!types[event.type].checked) continue;
    
    const eventTxt =  `message {message} Farming event: [${event.type}] ${event.event}\n`
    const stageTxtArray = [];

    for (const stage of event.stages) {
      if (difficulty == -2) {
        stageTxtArray.push(`event stage ${stage.stage} ${stage.levelFinal} ${repeats}\n`)
      } else {
        for (const level of stage.levels) {
          if (difficulty == -1) {
            stageTxtArray.push(`event stage ${stage.stage} ${level} ${repeats}\n`)
          } else if (difficulty == level) {
            stageTxtArray.push(`event stage ${stage.stage} ${level} ${repeats}\n`)
          }
        }
      }
    }

    // Só adiciona mensagem se tiver stages válidos (baseado nos filtros)
    if (stageTxtArray.length > 0) {
      txt += eventTxt;
      for (const stageTxt of stageTxtArray) {
        txt += stageTxt;
      }
    }
  }

  return txt;
}

export const downloadTxtFile = (resultText: string) => {
  const element = document.createElement("a");
  const file = new Blob([resultText], {
    type: "text/plain"
  });
  element.href = URL.createObjectURL(file);
  element.download = "generated_custom_command.txt";
  document.body.appendChild(element);
  element.click();
};

export const getLocaleProps = async (req:any) => {
  const headers = req.header;
  const locale = headers['locale'] || 'en';
  const translateProps = await serverSideTranslations(locale, ['index']);
  return translateProps;
}