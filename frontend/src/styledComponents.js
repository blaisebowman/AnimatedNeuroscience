import React from 'react';
import styled from 'styled-components';
import {Dropdown, Form, Menu, Message, Dimmer, Card, Header, Segment, Grid} from 'semantic-ui-react';

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
    .text {
        color: black !important;
    }
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
    &&&&&& > .ui.default.dropdown:not(.button)>.text, .ui.dropdown:not(.button)>.default.text {
        color: #000000 !important;
    }
`
export const CustomAnimationDropdown = styled(Dropdown)`
color: white !important;
    &&& > .dropdownContainer {
        background-color: rgba(27,77,228,1.0) !important;
        margin: 0 !important;
        padding-right: 0 !important;
    }
    &&& > .ui.dropdown {
        text-align: center !important;
    }
    &&&&&& .text{
        color: #ffffff !important;
    }
    &&& > .ui.dropdown>.dropdown.icon {
        color: #ffffff !important;
        margin-top: 0.25rem !important;
        margin-left: 0 !important;
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
    .text {
        color: white !important;
    }
`
export const CustomNavigationMenuItem= styled(Menu.Item)`
    flex: 1 1 auto !important;
    min-width: 14% !important;
`
export const CustomNavigationMenuItemLink= styled(Menu.Item)`
    flex: 1 1 auto !important;
    min-width: 14% !important;
    &&& > .ui.simple.active.dropdown>.menu, .ui.simple.dropdown:hover>.menu {
        opacity: 0 !important;
    }
`
export const CustomSegment= styled(Segment)`
    background: #000000 !important;
    border-radius: 0rem !important;
    min-height: 10% !important;
    margin: 0  !important;
    padding: 0em 0em !important;
`
export const DDItem= styled(Dropdown.Item)`
    &&& > a {
        color: #000000 !important;
    }
`
export const CustomDivider= styled(Dropdown.Divider)`
    margin-top: 0.5em !important;
    margin-bottom: 0.5em !important;
`
export const CustomHeader= styled(Dropdown.Header)`
    margin: 1rem 0.75rem !important;
    color: rgba(0, 0, 0, 1) !important;
    background-color: rgba(255, 255, 255, 1) !important;
    text-align: center;
`
export const CustomAdobeSegmentBrain= styled(Segment)`
    border: 0 !important;
    box-shadow: none !important;
    min-width: 67.5% !important;
    min-height: 87.5vh !important;
    padding: 2vh 0 2vh 0 !important;
    background-color: #000000 !important;
`
export const CustomAdobeSegmentSensory= styled(Segment)`
    border: 0 !important;
    box-shadow: none !important;
    min-width: 67.5% !important;
    min-height: 87.5vh !important;
    padding: 2vh 0 2vh 0 !important;
    background-color: #000000 !important;
`
export const CustomAdobeSegmentCerebellum= styled(Segment)`
    border: 0 !important;
    box-shadow: none !important;
    min-width: 67.5% !important;
    min-height: 82vh !important;
    padding: 2vh 0 2vh 0 !important;
    background-color: #000000 !important;
`
export const CustomAdobeSegmentNervous= styled(Segment)`
    border: 0 !important;
    box-shadow: none !important;
    min-width: 67.5% !important;
    min-height: 77.5vh !important;
    padding: 2vh 0 2vh 0 !important;
    background-color: #000000 !important;
`

export const CustomGrid= styled(Grid.Column)`
    padding-bottom: 0 !important;
`
export const CustomContainerSegment= styled(Segment)`
    border: 0 !important;
    box-shadow: none !important;
    min-width: 67.5% !important;
    max-width: 100% !important;
    min-height: 70.5vh !important;
    background-color: rgba(210,210,210,0.75) linear-gradient(rgba(255, 255, 255, 0.85), transparent) !important;
    padding: 0 0 0 0 !important;
`
