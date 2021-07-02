import React, { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from "@chakra-ui/react"

const JulietStatus = () => (
    <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
            <AccordionButton>
                <Box flex="1" textAlign="left">
                    Hi there, I'm Juliet Persia!
      </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
                If you see this, Juliet Persia Bot is ONLINE in version 0.4
    </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
            <AccordionButton>
                <Box flex="1" textAlign="left">
                    Invite me to your discord server!
      </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
                click this <a href="https://discord.com/oauth2/authorize?client_id=802744454107758624&scope=bot">LINK</a> to summon me to your server! :D
                Type -help. for all the command lists!
    </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <AccordionButton>
                <Box flex="1" textAlign="left">
                    Command lists:
      </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
                ~help : show command help <br />
                ~hello : to greet you <br />
                ~ani : for anime information <br />
                ~covid TYPECOUNTRY (example ~covid usa): for covid information <br />
                ~btc: information about bitcoin today <br />
                ~mtg CARDNAME (example ~mtg avacyn): for MTG card information <br />
            </AccordionPanel>
        </AccordionItem>
    </Accordion>
);

export default JulietStatus;