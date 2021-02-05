import ReactDOM from 'react-dom';
import * as React from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import App from './components/App';


const Chakra = () => {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  )
}
ReactDOM.render(
    <>
        <Chakra />
    </>
, document.getElementById('root'));

