import React from 'react';
import styled from 'styled-components';
import {Dropdown, Form, Menu, Message, Dimmer, Card, Header} from 'semantic-ui-react';

//tentative styled components, eventually replacing the usage of !important in .css and .scss files.

export const MessageLogin = styled(Message)`
        background: #f2f2f2 !important;
        border-radius: 1.5rem !important;
        color: rgba(0, 0, 0, 0.87) !important;
`
export const MessageSubtitle = styled(Message)`
        background: #f2f2f2 !important;
        border-radius: 1.5rem !important;
        color: rgba(0, 0, 0, 0.87) !important;
`
export const ProgressDimmer = styled(Dimmer)`
opacity: 1.0 !important;
background-color: rgba(70,70,70,0.5) !important;
`

export const SubmitButton = styled(Form.Button)`
    &&& > .ui.button {
    background-color: #e7600c !important;
    font-weight: 900;
    }
`
export const CustomCardDescription = styled(Card.Description)`
color: white !important;
background-color: #000000 !important;
    &&& > .ui.button {
    background-color: #e7600c !important;
    font-weight: 900;
    }
`
export const CustomMenuItem = styled(Menu.Item)`
text-align: center !important;
color: white !important;
background-color: #000000 !important;
`
export const CustomProgressMenuItem = styled(Menu.Item)`
text-align: center !important;
color: white !important;
background-color: #000000 !important;
    &&& > .ui.button {
    background-color: #e7600c !important;
    font-weight: 900;
    }
`
export const CustomProgressMenu = styled(Menu)`
color: white !important;
&&& > .ui.menu .item {
text-align: center !important;
}
`
export const CustomProgressHeader = styled(Header)`
font-family: "lato", sans-serif !important;
color: black !important;
`

export const CustomProgressDropdown = styled(Dropdown)`
color: black !important;
min-width: 100% !important;
&&& > .ui.dropdown>.text {
color: #0000000 !important;
}

&&& > .ui.dropdown:not(.button)>.default.text {
color: #0000000 !important;
text-color: #000000 !important;
}
&&& > .dropdown.icon {
       color: #000000 !important;
       margin-top: 0 !important;
       padding-top: 0 !important;
}
`

