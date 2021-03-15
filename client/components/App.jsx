import React, { useState } from 'react';
import JulietStatus from './JulietStatus';
import { Image, Box, Center, Text } from '@chakra-ui/react';
import NavBar from './NavBar';

const App = () => (
    <>
        <NavBar />
        <Box m="3em">
            <Center>
            <Image src="https://raw.githubusercontent.com/CloverJoy/CloverJoy/master/assets/JulietPersia.gif" alt="Juliet Persia" />
            </Center>
        </Box>
        <JulietStatus />
        <Box m="3em">
            <Center>
            <Text mr ="0.5em">© 2021 - Made with  </Text>
            💖 󠀠󠀠󠀠󠀠
            <Text ml="0.5em">By CloverJoy </Text>
            </Center>
        </Box>
    </>
);

export default App;
