// commented
import { llmTcpClient } from "./tcpServer";
import { checkTokenLength, assmble } from "../../helpers/assemble";
import { Socket } from "net"; // dgram : udp net : tcp

// node based


// established the connection to the llm  tpc server and wait for the tpc socket for response
export async function llmReq_N(host, port, reqObject) {

    return new Promise((resolve, reject) => {
        const socket = new Socket();
        socket.connect(port,host ,() => console.log('connected to the server'))
        socket.on('data', (d) => { 
            resolve({
                stat:true, 
                data :d
            })
        })
    
    if (reqObject.context.reqType != 'batch' ) {

        console.log('lots of tokens for llm supply')
        
        return {
            stat: false,
            data: null
        };

    }
    
    const llmRequest = JSON.stringify(reqObject)


     socket.write(llmRequest);

    })


}

// node based


// same thing for the translate server
export async function translateServer(host, port, reqObject) {

    return new Promise((resolve, reject) => {
        const socket = new Socket();
        socket.connect(port,host ,() => console.log('connected to the translator server'))
        socket.on('data', (d) => { 
            resolve({
                stat:true, 
                data :d
            })
        })


    const llmRequest = JSON.stringify(reqObject)


     socket.write(llmRequest);

    })




}



