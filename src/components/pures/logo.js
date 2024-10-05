import React from 'react';
import { Avatar } from 'rsuite';
import logoPic from '../../../assets/imgs/MAE.png';


export const LogoPic = () => { 

    return <Avatar className="mt-10" circle  style={{ background: '#000' }} size = "lg" src={logoPic} alt="mae" />

}

export const LogoText = (props) => { 


    return (
        <React.Fragment>

           <h4>
                    
                    {props.logoText}

            </h4> 


        </React.Fragment>
    )


}