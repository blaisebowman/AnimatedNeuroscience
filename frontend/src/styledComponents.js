import React from 'react';
import styled from 'styled-components';
import {Dropdown, Form, Menu, Message, Dimmer, Card, Header, Segment} from 'semantic-ui-react';

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
export const CustomNavigationMenu= styled(Menu)`
    display: flex !important;
    justify-content: space-between !important;
    border-radius: 0 !important;
    margin: 0 !important;
    background: rgba(0,0,0,0.9) !important;
    &&& > .visible.transition {
    height: 100% !important;
    }
    &&& > .active.item {
    border-radius: 2em !important;
    background: rgba(210,210,210,0.75) linear-gradient(rgba(255, 255, 255, 0.85), transparent) !important;
    transition-duration: 0.4s;
    background: -moz-linear-gradient(40deg, #05ebe4 0%, #8000f1 100%) !important;
    background: -webkit-linear-gradient(40deg, #05ebe4 0%, #8000f1 100%) !important;
    background: linear-gradient(40deg, #05ebe4 0%, #8000f1 100%) !important;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#05ebe4', endColorstr='#8000f1', GradientType=1) !important;
    }
`
export const CustomNavigationMenuItem= styled(Menu.Item)`
    flex: 1 1 auto !important;
    min-width: 14% !important;
    
`
export const CustomSegment= styled(Segment)`
    background: #000000 !important;
    border-radius: 0rem !important;
    min-height: 10% !important;
    margin: 0  !important;
    padding: 0.5em 0.5em !important;
   
    
`

