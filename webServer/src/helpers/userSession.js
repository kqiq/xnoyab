// commneted
// i dont think this file will in the server logic very heaviliy
import { v5 as uuidv5 , v4 as uuidv4} from 'uuid';
import { backToDate , timeStamp } from './timeUtils';


// use it for new users and also the user session
export function uuidGen(flag)  { 
    switch (flag) { 

        // use v5 for the user identifier
        case 'U' : 
        return uuidv5();

        // use v4 for the internal session state
        case 'I' : 
        return uuidv4();




        // we default to generate for the uesrs
        default : 
        return uuidv5();


    }
    return uuidv5();
    
} 
// must generate the v5 version of it 




// must create whitin the first user request to the webserver
export  function promptSesssion(userIdentifier,user) { 
    

    return { 

        prompt:uuidGen('I') , 
        promptTime:backToDate(timeStamp()) , 
        user
        
        
    }


}


export function chatToken(user) {

    // check for the user if it exeists check for it chat tokens if not have a chat token create one with U  flag
}

export function searchChatToken(user, token) { 
    // check for the user exitence 
    // then check for the current chat
}

export function chatHistory(user, chatToken) { 
    // check for the user existeed
    // thendepends on the chat tokens grab all its chat history
}



