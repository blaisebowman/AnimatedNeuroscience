import React from 'react';
import styled from 'styled-components';
import {Form, Message} from 'semantic-ui-react';

//tentative styled components, eventually replacing the usage of !important in .css and .scss files.

export const MessageLogin = styled(Message)`
        background: #f2f2f2 !important;
        border-radius: 1.5rem !important;
        color: rgba(0, 0, 0, 0.87) !important;
`

export const SubmitButton = styled(Form.Button)`
    &&& > .ui.button {
    background-color: #e7600c !important;
    font-weight: 900;
    }

`
