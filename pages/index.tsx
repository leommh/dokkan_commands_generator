import type { NextPage } from 'next'
import React, { useState } from 'react'
import dataTest from './api/dataTest'
import dataTypes from './api/types'

import { Command } from '../helpers/interfaces'
import { textToCommand, downloadTxtFile } from '../helpers';

const Home: NextPage = () => {
  const [text, setText] = useState<string>(dataTest);
  const [result, setResult] = useState<Command>({});
  const [repeats, setRepeats] = useState<Number>(15);
  const [types, setTypes] = useState<Array<object>>(dataTypes);

  function handleCommand() {
    const command = textToCommand(text, { repeats, types });
    setResult(command);
  }

  function handleChange(value: string) {
    setText(value);
  }

  function download() {
    downloadTxtFile(result);
  };

  return (
    <main className={'main'}>
      <div className={'form'}>
        <div className='filters'>
          <h4 className="title">
            Filters:
          </h4>
        </div>
        <textarea placeholder='Insira todos os stages dessa forma: id_stage:repetições, id_stage:repetições...' value={text} onChange={(event) => handleChange(event.target.value)} />
        <button onClick={handleCommand}>Generate Custom Command</button>
      </div>

      <div className={'result'}>
        {Object.keys(result).length > 0 && (
          <>
            <h4 className="title">
              Custom Command
            </h4>
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
              <button onClick={download}>Download</button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default Home
