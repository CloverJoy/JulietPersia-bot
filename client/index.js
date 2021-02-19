import ReactDOM from 'react-dom';
import * as React from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import App from './components/App';

ReactDOM.render(
    <ChakraProvider>
    <App />
    </ChakraProvider>
, document.getElementById('root'));

