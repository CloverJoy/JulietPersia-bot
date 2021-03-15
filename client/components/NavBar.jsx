import React from 'react';
import { Flex, Box, Button, Spacer, Heading } from '@chakra-ui/react'

const NavBar = () => (
  <Flex m="2em">
    <Box p="2">
      <Heading size="md">Juliet Persia</Heading>
    </Box>
    <Spacer />
    <Box>
      <Button colorScheme="teal" mr="1em">
      <a href="https://discord.com/oauth2/authorize?client_id=802744454107758624&scope=bot">
        Invite me on Discord!
      </a>
      </Button>
      <Button colorScheme="teal">
      <a href="https://github.com/CloverJoy/JulietPersia-bot">
        Github
      </a>
      </Button>
    </Box>
</Flex>
);

export default NavBar;
