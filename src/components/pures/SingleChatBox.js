import React, {useState} from 'react'
import { Panel, Placeholder } from 'rsuite';





const SingleChatBox  = ({chatInfo}) =>{


     

    return ( 

        <Panel header={chatInfo.role} shaded>
            {chatInfo.value}
        </Panel>

    )

}


export default SingleChatBox;

