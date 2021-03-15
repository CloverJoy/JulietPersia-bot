import ReactDOM from 'react-dom';
import * as React from 'react';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from './theme'
import App from './components/App';

ReactDOM.render(
    <>
        <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <App />
        </ChakraProvider>
    </>
, document.getElementById('root'));

