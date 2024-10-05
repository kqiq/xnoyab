import React, { useState, useEffect } from "react";
import { Container, Header, Content, Footer, Sidebar, ButtonGroup } from 'rsuite';
import { Button, ButtonToolbar } from 'rsuite';
//import { Col , Container , Row } from "reactstrap";
import { Grid, Row, Col } from 'rsuite';
import ConversationTag from "./ConversationTag.js";
import { Input } from 'rsuite';
import { Dropdown } from 'rsuite';
import { Panel } from 'rsuite';
import ChatBoxManager from "./chatBoxManger.js";
import SingleChatBox from "./SingleChatBox.js";
import { State1, State2, State3, State4, State5 } from "./States.js";
import { v4 as uuidv4 } from 'uuid';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export const DropdownC = ({ title, modes, getMode }) => {

  const [TileState, setTileState] = useState(modes[0])



  const dropCapture = (e) => {


    setTileState(() => {
      getMode(e.target.accessKey);
      return e.target.accessKey;
    });


    console.log(e)


  }


  return (

    <Dropdown className="ml-1" title={TileState}>

      {modes.map((mode, i) => {
        return <Dropdown.Item accessKey={mode} eventKey={i} onClick={(e) => {
          dropCapture(e);
        }}>{mode}</Dropdown.Item>
      })}
    </Dropdown>


  )

}


const TextArea = ({ onTChange, innerValue }) => {

  return (<Panel shaded className="gray-bp">
    <Input onChange={(e) => {
      onTChange(e)
    }} className="gray-b" as="textarea" rows={2} value={innerValue} placeholder="Textarea" />

  </Panel>)

}


{/* some how every is in layout */ }



export const Layout = (props) => {


  let userId = uuidv4();


  let counter = 0;



  // must get from the db when mounted.
  //const [chats , setChats] = useState([]);

  // when mounted must get the reslated inroamtoin from the user id and and so on 
  // for the demo we assume that every time we enter its empty


  // keep track of active data table for all states
  const [dataTable, setDataTable] = useState({
    state1: {},
    state2: {},
    state3: {},
    state4: {},
    state5: {}
  });



  const langs = ['en', 'fa'];

  // indicate the current triage state.
  const [trState, setTrState] = useState('state1');
  // we need to go with string in this case


  const [layoutState, setLayoutState] = useState(0);


  const [modeValue, setModeValue] = useState("genenral");

  const [isMounted, setIsMounted] = useState(false);



  const [langValue, setLangValue] = useState(langs[0]);




  const setLang = (l) => {
    setLangValue(() => {
      return l;

    });

  }



  const updateDataTable = (data) => {
    // this data container the questions for the phazes we have.   
    setDataTable((prev) => {
      return {
        ...prev,
        [data.stateName]: data.data

      }
    });

  }

  // just update the state number Value
  const updateTrState = (tr) => {

    setTrState((prev) => {


      return tr;


      // must check if the tr state is ok 
    });

  }





  const renderState = (stateName) => {


    // stateNum :  state1 , state2
    const data = dataTable[stateName]

    // need to checked

    // get the state data from the state num

    // return the state Compoennt with the num related

    switch (stateName) {
      case 'state1':
        return <State1 data={data} updateDataTable={updateDataTable} updateTrState={updateTrState} id={userId} lang={langValue} />
      case 'state2':
        return <State2 data={data} updateDataTable={updateDataTable} updateTrState={updateTrState} id={userId} dataTable={dataTable} lang={langValue} />

      case 'state3':

        return <State3 data={data} updateDataTable={updateDataTable} updateTrState={updateTrState} id={userId} lang={langValue} dataTable={dataTable} />
      case 'state4':
        return <State4 data={data} updateDataTable={updateDataTable} updateTrState={updateTrState} id={userId} dataTable={dataTable} lang={langValue} />
      case 'state5':
        return <State5 data={data} updateDataTable={updateDataTable} updateTrState={updateTrState} id={userId} lang={langValue} />
      default: return 'no state is matched'


    }




    /* 

    return the corespond state with the number and  and put the ata inside of it

    */

  }



  const getMode = (m) => {
    setModeValue(() => {

      return m;


    });
  }





  return (

    <div className="w-100 mh-100 h-100 bg-black">

      <Grid fluid className="whole h-100 position-fixed" >


        {/* start nav sec*/}


        {/* 
<TopNav searchObject={props.searchObject}/> */}



        {/* end nav sec */}


        <Row className="h-100">
          <Col lg={3} className="blue h-100">
            <Row className="h-100">
              <Col lg={24} className="h-100 yell">

                <Row className="h-10 pink ">

                  <Col lg={24} className="d-flex pt-12 justify-content-center h-100 black">
                    <h1>Noyaab</h1>
                  </Col>
                </Row>
                <Row className="h-90 black">


                  <Col lg={24} className="w-100 h-100 pt-10 d-flex justify-content-center">



                    <UncontrolledDropdown className='mrp-10 mt-9'>
                      <DropdownToggle
                        caret
                        color="info"
                      >

                        {langValue}
                      </DropdownToggle>
                      <DropdownMenu dark>
                        <DropdownItem header>
                          Language
                        </DropdownItem>


                        {

                          langs.map(lang => {


                            return (<DropdownItem onClick={() => {

                              setLang(lang)


                            }}>
                              {lang}
                            </DropdownItem>)

                          })


                        }
                      </DropdownMenu>
                    </UncontrolledDropdown>



                    {/* <Row className="h-10 ">

                      <Col lg={24}>

                        <History dataObject={dataTable} />
                      
                      </Col>
         

                    </Row> */}


                    {/* 
                    <Row className="h-90">

                      <Col lg={24} className="overFlowChat d-flex justify-content-center">



                        {



                          conversations.map((conver)=>{


                            return <ConversationTag conversationId={conver.conversationId}/>



                          })




                        }  
                      </Col>


                    </Row> 

 */}


                  </Col>


                </Row>

              </Col>
            </Row>
          </Col>


          {/* here to here */}


          <Col lg={21} className="yell h-100">
            <Row className="h-100">
              <Col lg={24} className="h-100 black ovfauto">

                <Row className="h-100 bg-light d-flex justify-content-center overFlowChat">

                  <Row className="h-100 w-90 gray-bp">




                    <Col lg={22} className="pt-2 border" >
                      {/* <TextArea onTChange={handleTextAreaChange} innerValue={textAreaValue}/> */}
                      {renderState(trState)}
                      {console.log(dataTable)}
                      {/* <State1 updateDataTable={updateDataTable} updateTrState={updateTrState}/> */}
                    </Col>

                  </Row>


                </Row>


                {/* this is the text area section */}
                {/* <Row className="h-20 ">
                  <Col lg={22} className="pt-2">
                    <TextArea onTChange={handleTextAreaChange} innerValue={textAreaValue}/>
                  </Col>

                  <Col lg={2} className="pt-2 justify-content-center flex">
                                

                  <DropdownC title="dropi" modes = {['gen', ,'medical']} getMode={getMode}/>
                        <Button onClick={(e)=>{
                          sendButton()
                        }} className="mt-5" block color="green" appearance="primary" >
                    send
                        </Button>
                      
                    
                  </Col>
                </Row> */}


                {/* this is the text area section */}

              </Col>
            </Row>

          </Col>
        </Row>

      </Grid>

    </div>



  )

}

