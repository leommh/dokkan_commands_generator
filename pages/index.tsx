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

import { Command, Types } from '../helpers/interfaces'
import { textToCommand, downloadTxtFile, commandToTxt } from '../helpers';

const Home: NextPage = () => {
  let result:Command = {};

  const [text, setText] = useState<string>(commandExample);
  const [resultText, setResultText] = useState<string>('');
  const [repeats, setRepeats] = useState<number>(15);
  const [types, setTypes] = useState<Types>(dataTypes);

  function handleCommand() {
    const command = textToCommand(text, repeats);
    result = command;
    const commandText:string = commandToTxt(result, types);
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
  }

  return (
    <main className={'main'}>
      <Box className={'form'} p={4}>
        <Flex mb={15} className='filters' direction="column">
          <Center>
            <Text fontSize='lg' style={{ fontWeight: 'bold' }}>Filters</Text>
          </Center>
         
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
                <FormLabel>Repeats</FormLabel>
                <Select placeholder='Select option' defaultValue={repeats}>
                  {dataRepeats.map((number, index) => <option key={index + '_select'} value={number} onChange={(value) => setRepeats(number)}>{number}</option>)}
                </Select>
              </FormControl>
            </Box>
            
          </Flex>
        </Flex>

        <FormControl mb={15} className='textarea-command'>
          <FormLabel>Text</FormLabel>
          <Textarea
            value={text}
            onChange={(event) => handleChange(event.target.value)}
            placeholder='Insert events listed in dokkan bot...'
            variant="filled"
            size='md'
          />
        </FormControl>

        <Button onClick={handleCommand} colorScheme='teal' variant='outline'>Generate Custom Command</Button>
      </Box>

     
        {resultText.length > 0 && (
          <Box p={4} mt={0} className={'result'}>
            <Divider mb={4} />
            <FormControl mb={15} className='textarea-command'>
              <FormLabel>Text</FormLabel>
              <Textarea
                value={resultText}
                placeholder=''
                variant="filled"
                size='md'
              />
            </FormControl>

            <Button onClick={download} colorScheme='teal' variant='solid'>Download</Button>
          </Box>
        )}
    </main>
  )
}

export default Home
