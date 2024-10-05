import React from "react";
import SingleChatBox from "./SingleChatBox";


const ChatBoxManager = ({chats}) => { 


    {/*  [{} , {}]   */}
    console.log(chats);
  return  chats.chats.map(chat =>{

        return <SingleChatBox chatInfo={chat}/>
    });

}


export default ChatBoxManager;