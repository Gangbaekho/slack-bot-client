import React from 'react'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Select,
  Input,
  Divider 
} from '@chakra-ui/react';

const Wapper = (props) => {
  return (
    <Center py={6} w="100vw" h="100vh">
      <Box
        maxW={'50vw'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
         {props.children}
      </Box>
    </Center>
  );
}

export default Wapper;