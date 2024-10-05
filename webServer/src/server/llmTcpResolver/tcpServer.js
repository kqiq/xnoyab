// commented



// tcp client server for talking the llm tcp server written in python
// works on llmtcp host , llm tcp port , and some handler : specify tcp interfaces objects on the socket
export async function llmTcpClient(llmHost, llmPort , tcpClientObjectHandler) { 

  
const socket = await Bun.connect({
    // this two must be synched and read from the file
    hostname:llmHost,
    port: llmPort,
  
    socket: {
      data(socket, data) {
        tcpClientObjectHandler.data(socket,data)

      },
      open(socket) {
        tcpClientObjectHandler.open(socket)
      },
      close(socket) {
        tcpClientObjectHandler.close(socket)
      },
      drain(socket) {},
      error(socket, error) {
        tcpClientObjectHandler.error(socket,error)
      },
  
      // client-specific handlers
      connectError(socket, error) {}, // connection failed
      end(socket) {}, // connection closed by server
      timeout(socket) {}, // connection timed out
    },
  });




  // return the socket to the llm server
  return socket;
  


}


