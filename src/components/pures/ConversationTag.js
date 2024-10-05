import React from "react";
import { Button} from 'rsuite';




const ConversationTag = (props) =>{ 


    return (

             <Button block color="yellow" appearance="primary">
                {props.conversationId}
                        </Button>
                      

    )

}


export default ConversationTag;