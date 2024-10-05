import React from "react";
import { IconButton } from "rsuite";

import {Row, Col} from 'rsuite';




export const SmallToolLeft = (props) => { 
    // small SideNav One component
    // this props has controller compoennet that will create the fucntionality small side nav COmpoent
    // start icon must be dynamic and other styles : like props.viewCompoennt
    const Icon = props.iconComp;

    return (
        <React.Fragment>


        <Row className="d-flex justify-content-center"><Col className="pt-2we">
        
        
                <IconButton icon={Icon} appearance={props.colorMode} />
        
        </Col></Row>

        </React.Fragment>)

}