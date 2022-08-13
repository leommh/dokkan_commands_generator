import type { NextPage } from 'next'
import React, { useState } from 'react'
import dataTest from './api/dataTest'

const Home: NextPage = () => {
  const [text, setText] = useState<any>(dataTest);
  const [result, setResult] = useState<any>({});
  const [repeats, setRepeats] = useState<Number>(15);

  function handleCommand() {
    const splitted = text.split(/\r?\n|\r|\n/g);
    const temp:any = {};
    let lastEvent:string = '';

    for (const item of splitted) {
      const messageRegex = /\[.*\]/i;
      const stageRegex = /\(.*\)/i;

      if (stageRegex.test(item)) {
        if (!temp[lastEvent]) continue;

        const stageFullSplit = item.split(' - ');
        const stageSplit = stageFullSplit[0].split('(');
        const stage = stageSplit[0].trim();
        let levels:Array<number> = stageSplit[1].replace(')', '').split(',').map((level:any) => Number(level));
        const levelFinal = Math.max(...levels);

        temp[lastEvent].stages.push({
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

        temp[event] = {
          type,
          event,
          stages: [],
          text: `{message} Farming event: [${type}] ${event}`,
        };
      };
    }

    setResult(temp);

    console.log(temp);
  }

  function handleChange(value: String) {
    setText(value);
  }

  function generateTxt() {
    if (Object.keys(result).length <= 0) return alert('Error 8000+');

    let txt:String = '';

    for (const event of Object.values(result)) {
      txt += `${event.text} \n`;
      
      for (const stage of event.stages) {
        txt += `${stage.text} \n`;
      }
    }

    return txt;
  }

  function downloadTxtFile() {
    const txt = generateTxt();
    const element = document.createElement("a");
    const file = new Blob([txt], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "generated_custom_command.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <main className={'main'}>
      <div className={'form'}>
        <textarea placeholder='Insira todos os stages dessa forma: id_stage:repetições, id_stage:repetições...' value={text} onChange={(event) => handleChange(event.target.value)} />
        <button onClick={handleCommand}>Generate Custom Command</button>
      </div>

      <div className={'result'}>
        {Object.keys(result).length > 0 && (
          <>
            <div className={'text'}>
              { 
                Object.values(result).map((item:any, index) => {
                  return (
                    <div key={index + '_event'}>
                      <p>{`{message} Farming event: [${item.type}] ${item.event}`}</p>
                      {item.stages.map((stage: any, stageIndex: number) => {
                        return (
                          <p key={stageIndex + '_stage'}>{stage.text}</p>
                        )
                      })}
                    </div>
                  )
                })
              }
            </div>
            <div className='bottom-actions'>
              <button onClick={downloadTxtFile}>Download</button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default Home
