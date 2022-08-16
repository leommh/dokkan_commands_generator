import type { NextPage } from 'next'
import React, { useState } from 'react'
import { 
  Checkbox, 
  Stack, 
  Text, 
  Select, 
  Textarea, 
  Divider, 
  Button,
  FormControl,
  FormLabel,
  Flex, 
  Box,
  Spacer,
  Center
} from '@chakra-ui/react'
import commandExample from '../data/commandExample'
import dataTypes from '../data/types'
import dataRepeats from '../data/repeats'
import dataDifficulties from '../data/difficulties'

import { Command, Types, Difficulty } from '../helpers/interfaces'
import { textToCommand, downloadTxtFile, commandToTxt } from '../helpers';

const Home: NextPage = () => {
  let result:Command = {};

  const [text, setText] = useState<string>(commandExample);
  const [resultText, setResultText] = useState<string>('');
  const [repeats, setRepeats] = useState<number>(15);
  const [difficulty, setDifficulty] = useState<number>(-2);
  const [types, setTypes] = useState<Types>(dataTypes);
  const [updates, setUpdate] = useState<number>(0);

  function handleCommand() {
    const command = textToCommand(text);
    result = command;
    const commandText:string = commandToTxt(result, types, repeats, difficulty);
    setResultText(commandText);
  }

  function handleChange(value: string) {
    setText(value);
  }

  function download() {
    downloadTxtFile(resultText);
  };

  function handleType(name: string, checked: boolean) {
    const newTypes = types;
    newTypes[name].checked = checked;
    setTypes(newTypes);
    setUpdate(updates + 1);
  }

  return (
    <main className={'main'}>
      <Box className={'form'} p={4}>
        <Flex mb={15} className='filters' direction="column">
          <Center>
            <Text fontSize='lg' style={{ fontWeight: 'bold' }}>Filters</Text>
          </Center>

          <Divider mb={4} mt={4} />
    
          <Flex gap='2'>
            <Box>
              <FormControl>
                <FormLabel>Types</FormLabel>
                <Stack spacing={5} direction="row">
                  {Object.values(types).map((type, index) => (
                    <Checkbox 
                      key={index + '_type'} 
                      colorScheme='red' 
                      isChecked={type.checked} 
                      onChange={(e) => handleType(type.name, e.target.checked)}
                    >
                      {type.name}
                    </Checkbox>
                  ))}
                </Stack>
              </FormControl>
            </Box>

            <Spacer />

            <Box>
              <FormControl>
                <FormLabel>Repeat</FormLabel>
                <Select placeholder='Select option' defaultValue={repeats} onChange={(event) => setRepeats(Number(event.target.value))}>
                  {dataRepeats.map((number, index) => <option className={number == 15 ? 'recommended' : ''} key={index + '_select'} value={number}>{number}</option>)}
                </Select>
              </FormControl>
            </Box>

            <Spacer />

            <Box>
              <FormControl>
                <FormLabel>Difficulty</FormLabel>
                <Select placeholder='Select option' defaultValue={difficulty} onChange={(event) => setDifficulty(Number(event.target.value))}>
                  {dataDifficulties.map((item: Difficulty, index) => <option className={item.class || ''} key={index + '_difficulty'} value={item.value}>{item.name}</option>)}
                </Select>
              </FormControl>
            </Box>
            
          </Flex>
        </Flex>

        <Divider mb={4} mt={4} />

        <FormControl mb={15} className='textarea-command'>
          <FormLabel>Insert text to generate command (use event list in bot to view all text)</FormLabel>
          <Text mb={5} size="sm" color="red">by default I already left a list of events inserted below to make it easier (this list is from 08/14/2022)</Text>
          <Textarea
            value={text}
            onChange={(event) => handleChange(event.target.value)}
            placeholder='Insert events listed in dokkan bot...'
            variant="filled"
            size='md'
          />
        </FormControl>

        <Flex>
          <Button onClick={handleCommand} colorScheme='teal' variant='solid'>Generate Custom Command</Button>
          <Button ml={5} onClick={() => setText('')} colorScheme='black' variant='outline'>Clear</Button>
        </Flex>
 
      </Box>

     
        {resultText.length > 0 && (
          <Box p={4} mt={0} className={'result'}>
            <Divider mb={4} />
            <FormControl mb={15} className='textarea-command'>
              <FormLabel>Dokkan Custom Command</FormLabel>
              <Textarea
                value={resultText}
                placeholder=''
                variant="filled"
                size='md'
                style={{ borderColor: 'green', background: 'white' }}
                readOnly
              />
            </FormControl>

            <Button onClick={download} colorScheme='green' variant='solid'>Download</Button>
          </Box>
        )}
    </main>
  )
}

export default Home
