import React,{useState} from "react";
import {Row , Col} from 'rsuite';
import { LogoPic, LogoText } from "../pures/logo";
import { SearchBar } from "./searchbar";
import { LittleNavi } from "./littleNavi";
import { UserButton } from "./userButtons";


export const TopNav = (props) => { 

    


    return ( 
        <React.Fragment>

<Row className="h-10">

<Col className="dng" lg={24} xl={24}>
  <Row className="headerContainerRow h-100">

    <Col lg={3} className="black h-100">

      <Row className="h-100">
        <Col lg={12} className="h-100 pink pt-10 pl-6">
        <LogoPic/>
        </Col>

        <Col lg={12} className=" coral h-100  pt-16">
        <LogoText logoText="maE"/>
        </Col>

      </Row>

    </Col>
    <Col lg={7} className="pink h-100 pt-2w"><SearchBar searchObject = {props.searchObject}/></Col>
   
    <Col lg={8} className="blue h-100 pt-2w"><LittleNavi/></Col>
    <Col lg={6} className="yell h-100 pt-2w"><UserButton/></Col>


  </Row>
</Col>
</Row>
        </React.Fragment>


    )
}

