import React from 'react';
import styled from 'styled-components';
import {Button, Dropdown, Form, Menu, Message, Dimmer, Card, Header, Segment, Grid, Table} from 'semantic-ui-react';
import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate/build";
import OlfactorySystem from "./components/sensorySystems/Animations/olfactory_system";

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
    margin: 1em 0 0 0 !important
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
    margin-right: 2.14em !important;
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
//MOBILE COMPONENTS BELOW
/*TODO -> Z-INDEX FOR DROPDOWN*/
export const MobileContainerHeader= styled(Header)`
    @media screen and (orientation:landscape) {
/*
        display: none !important;
*/
    }
`
export const MobileDropdown= styled(Dropdown)`
    padding-right: 2rem  !important;
    padding-left: 2rem  !important;
    background: linear-gradient(40deg, #05ebe4 0%, #8000f1 100%) !important;
    background-color:  black !important;
    min-height: 4vh !important;
    .text {
      color: white !important;
      margin: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &&& > .icon {
      margin: 1.25vh 0 0 0 !important;
    }
    @media screen and (orientation:landscape) {
        /*display: none !important;*/
    }
`
export const MobileSettingsDropdown= styled(Dropdown)`
    padding-right: 2rem  !important;
    padding-left: 2rem  !important;
    background: black !important;
    background-color:  black !important;
    min-height: 4vh !important;
    .text {
      color: white !important;
      margin: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &&& > .icon {
      margin: 1.25vh 0 0 0 !important;
    }
    border-radius: .28571429rem;
`
export const MobileSettingsGrid= styled(Grid)`
    border: 0 !important;
    background: none !important;
    padding: 0 0 0 0 !important;
    margin: 0 0 0 0 !important;
`
export const ImageGridColumnMob= styled(Grid.Column)`
    padding: 1rem 0rem 1rem 0rem !important;
    background-color: black !important;
    box-shadow: none !important;
`

export const MobileHeader= styled(Header)`
    color: white !important;
}
`
export const MobileContainerSegment= styled(Segment)`
    border: 0 !important;
    background: rgba(210,210,210,0.75) linear-gradient(rgba(255, 255, 255, 0.85), transparent) !important;
    padding: 0 0 0 0 !important;
`
export const MobileInnerContainerSegment= styled(Segment)`
    border: 0 !important;
    background-color: rgba(210,210,210,0.75) linear-gradient(rgba(255, 255, 255, 0.85), transparent) !important;
    padding: 0 0 0 0 !important;
`
export const MobileGrid= styled(Grid)`
    border: 0 !important;
    background-color: rgba(210,210,210,0.75) linear-gradient(rgba(255, 255, 255, 0.85), transparent) !important;
    background: none !important;
    padding: 0 0 0 0 !important;
    margin: 0 0 0 0 !important;
     @media screen and (orientation:landscape) {
    width: 100vw !important;
    background: color !important;
    }
`
export const MobileGridPrimaryRow= styled(Grid.Row)`
    padding-top: 0 !important;
    @media screen and (orientation:landscape) {
/*
        display: none !important;
*/
    }
`
export const MobileGridSecondaryRow= styled(Grid.Row)`
    padding-top: 0 !important;
`
export const MobileGridSecondaryProgressRow= styled(Grid.Row)`
    padding-top: 0 !important;
    padding-bottom: 0 !important;
`
export const MobileInnerSegment= styled(Segment)`
    margin: 0 0 0 0 !important;
    padding-top: 1em 1em !important;
    background: rgba(210,210,210,0.75) linear-gradient(rgba(255, 255, 255, 0.85), transparent) !important;
    min-height: 78vh !important;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-radius-bottom: 0 !important;
    border-bottom: none !important;
    border-right: none !important;
    border-left: none !important;
`
export const MobileHeaderButton= styled(Button)`
    color: white !important;
    white-space: nowrap;
    overflow: hidden !important;
    text-align: center !important;
    padding: .78571429em 0.55em .78571429em 0.55em !important;
    &&& > a {
     color: white !important;
    }
    .icon {
        margin-right: 0.25rem !important;
    }
   
`
export const CustomMobileProgressMenu = styled(Menu)`
    color: white !important;
    &&& > .ui.menu .item {
        text-align: center !important;
    }
    margin-top: 0 !important;
    background: none !important;
`
export const CustomMobileMenuItem = styled(Menu.Item)`
    text-align: center !important;
    color: white !important;
    background-color: #000000 !important;
    margin-top: 1rem !important;
    border-radius: 0.25rem !important;
`
export const MobileProgressMenuMessage = styled(Message)`
    padding-top: 0 !important;
`
export const CustomMobileProgressHeader = styled(Header)`
    font-family: "lato", sans-serif !important;
    color: black !important;
    word-wrap: break-word !important
    text-align: justify !important;
`
export const MobileCard= styled(Card)`
    margin-top: 0 !important;
`
export const MobileAnimation= styled(AnimateCC)`
    div {
        display: none !important;
    }
    @media screen and (orientation:landscape) {
        margin: 0 auto !important;
        width: 100% !important;
    }
    @media screen and (orientation:portrait) {
           margin-left: 0 !important;
           margin-right: 0 !important;
    }
                       
`
export const MobileAnimationSegment= styled(Segment)`
    border: 0 !important;
    background: rgba(210,210,210,0.75) linear-gradient(rgba(255, 255, 255, 0.85), transparent) !important;
    padding: 0 0 0 0 !important;
    min-height: 78vh !important;
`
export const MobileAnimationMessage= styled(Message)`
    @media screen and (orientation:landscape) {
            background: black !important;
            margin: 0 0 0 0 !important;
            /*display: none !important;*/
    }
`
export const AdobeContainer= styled(Segment)`
    @media screen and (orientation:landscape) {
        margin: 0 0 0 0 !important;
        padding: 0 0 0 0 !important;
        border: none !important;
        object-fit: contain !important;
        margin: 0 auto !important;
        &&& > canvas {
        color: blue !important;
        }
    }
`
export const FullScreen= styled(Segment)`
    @media screen and (orientation:landscape) {
        padding: 0 0 0 0 !important;
        border: none !important;
        background-color: black !important;
        position: relative !important;
        justify-content: center !important;
        margin: auto !important;
          margin: 0 auto !important;

    }
`
export const PortraitMessage= styled(Message)`
    @media screen and (orientation:landscape) {
        display: none !important;
    }
`
export const MobileAnimationDropdown = styled(Dropdown)`
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

export const MobileNavBarButton = styled (Button)`
    width: 100% !important;
    min-height: 1em !important;
    cursor: pointer;
    display: inline-block;
    min-height: 1em;
    outline: 0;
    vertical-align: baseline;
    background: #ffffff none;
    color: rgba(0,0,0,1);
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    margin: 0 .25em 0 0;
    padding: .78571429rem 1.14285714rem!important; !important;
    text-transform: none;
    text-shadow: none;
    border-top: 1px solid rgba(0,0,0,0.1) !important;
    font-weight: 700;
    line-height: 1em;
    font-style: normal;
    text-align: left;
    text-decoration: none;
    border-radius: .28571429rem;
    box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgb(34 36 38 / 15%) inset;
    -webkit-user-select: none;
    user-select: none;
    transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s 
`
export const MobileNavBarFirstButton = styled (Button)`
    width: 100% !important;
    min-height: 1em !important;
    cursor: pointer;
    display: inline-block;
    min-height: 1em;
    outline: 0;
    border: none;
    vertical-align: baseline;
    background: #ffffff none;
    color: rgba(0,0,0,1);
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    margin: 0 .25em 0 0;
    padding: .78571429rem 1.14285714rem!important; !important;
    text-transform: none;
    text-shadow: none;
    border-bottom: 1px solid rgba(0,0,0,0.1) !important;
    font-weight: 700;
    line-height: 1em;
    font-style: normal;
    text-align: left;
    text-decoration: none;
    border-radius: .28571429rem;
    box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgb(34 36 38 / 15%) inset;
    -webkit-user-select: none;
    user-select: none;
    transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s 
`
export const ErrorAnimation = styled(Message)`
    text-align: center;
`