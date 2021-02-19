import React, { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from "@chakra-ui/react"

const App = () => (
    <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
            <AccordionButton>
                <Box flex="1" textAlign="left">
                    Section 1 title
      </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
    </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
            <AccordionButton>
                <Box flex="1" textAlign="left">
                    Section 2 title
      </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
    </AccordionPanel>
        </AccordionItem>
    </Accordion>
);

export default App;