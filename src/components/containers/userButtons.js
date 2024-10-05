import React from "react";
import {Nav} from 'rsuite';
import { Whisper} from 'rsuite';
import { TinyAuth } from "./tinyReg";

export const UserButton = (props)=> { 
    return (
     <Nav>
        <Nav.Item>News</Nav.Item>
        <Nav.Item>Solutions</Nav.Item>
        <Nav.Item>Products</Nav.Item>
        
        <Nav.Item>

<TinyAuth/>

        </Nav.Item>
      </Nav>

    );

}