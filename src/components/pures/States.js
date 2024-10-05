import React, { useState } from "react";
import { Form, Row, Col, FormGroup, Input, Label, Button } from "reactstrap";
import { DropdownC } from "./layout";
import { Badge, Spinner } from "reactstrap";
import { v4 as uuidv4 } from 'uuid';
import { extractExpertise, handleQ } from "./helpers";
import { handleQQ, anotherHandle } from "./helpers";
import _ from 'lodash'


const base = `${process.env.HOST}:${process.env.SERVERPORT}/`


// we can create the template and do there answer extractioin here  specially quewtions


async function sendToServer(serverUrl, dataObject, lang) {

  const response = await fetch(serverUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      context: [dataObject],
      lang: lang

    })
  })

  const data = await response.json();
  return data;

}


const loadingComponent = (
  <React.Fragment>
    <Spinner size="sm">
      Loading...
    </Spinner>
    <span>
      {' '}Loading
    </span>
  </React.Fragment>

)






// this is the FIRST STATE : for geting meta data afrom the user 
export const State1 = ({ id, data, updateDataTable, updateTrState, lang }) => {
  /*

    this gonna work with some data 
    gonna return some ui depends on the data
    gonna update the state of the app

  */
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(20);
  const [rootSymp, setRootSymp] = useState('');
  const [loading, setLoading] = useState(false);



  // its better to avoid on this and then go 
  // mimic the server reqeust
  const serverRequset = async (data) => {

    // you can supply the data 
    // and you can supply the result
    // you can supply the stateName also 



  
    let res = await sendToServer(base+'sympc/s1', {
      id,
      gender,
      age,
      rootSymp,
      cat: 's1'

    }, lang)


    return res;


    // return new Promise((res, rej) => {

    //   setTimeout(() => {
    //     // some data comes from the server

    //     res({

    //       stateName: 'state2',

    //       data: {

    //         // data use feor rendering the views : in this case questions
    //         questions: ['first q  ?', 'second q ? ', 'third q ? ']

    //       }
    //     })


    //   }, 2000);


    // });

  }



  const handleQ = (context) => {

    //const regex = /(\d+\.)\s*([^?]+)/g;
    const regex = /(\d+)\s*([^\u0600-\u06FF]+)/g
    const questions = [];

    for (let match of context.matchAll(regex)) {
      questions.push(match[2]);
    }

    console.log(questions); // Output: ["what's your name?", "how old are you?", "are you ok?"])
    return questions;


  };



  const handleForm = async (e) => {

    e.preventDefault();

    updateDataTable({ stateName: 'state1', data: { age, gender, rootSymp } });

    console.log('current Data Table');

    setLoading(() => true);

    let res = await serverRequset({ age, gender, rootSymp });


    // check the result here 
    // then converit the raw data to queston in the front
    // update and process data that come fro mthe server

 //   console.log(res.data.data.suc[0]['result']);

//    console.log(handleQ(res.data.data.suc[0]['result']));
    console.log(res.data.data);
    


    updateDataTable({stateName:'state2' , data : { questions :res.data.data.suc[0]['result']}});



    // // we have to process data that comes from the server
    // console.log(res);
    // // this will gives us some array of things

    // // and update the DataTable to the new results for the state 2
    // updateDataTable(res);

    // set the currentState to the 2


    updateTrState('state2');

  }


  const switchGender = (value) => {

    setGender(() => {
      return value;

    });

  }





  return (


    <Form>
      <Row>
        <Col md={6}>
          <FormGroup>
            {/* <Label for="gender">
          gender
        </Label> */}
            <DropdownC title="gender" modes={['male', 'female']} getMode={setGender} />
          </FormGroup>
        </Col>

        <Col md={2}>
          <FormGroup>
            <Label for="age">
              age
            </Label>
            <Input
              value={age}
              id="age"
              name="zip"
              onChange={(e) => {

                setAge(() => {
                  return e.target.value;
                })

              }}
            />
          </FormGroup>
        </Col>

      </Row>
      <FormGroup>

        <Label for="rootSymp">
          what suffer you the most
        </Label>
        <Input
          value={rootSymp}
          id="rootSymp"
          name="rootSymp"
          placeholder="i have a headache"
          onChange={(e) => {

            setRootSymp(() => {
              return e.target.value
            });


          }}
        />
      </FormGroup>
      <Button color="info" onClick={handleForm}>
        {loading ? loadingComponent : 'Continue'}


      </Button>
    </Form>

  )

}


// we go can on this state on the user diaegnose
export const State2 = ({ id, data, updateDataTable, updateTrState, dataTable , lang}) => {


  const [dataa, setData] = useState({});

  const [loading, setLoading] = useState(false);



  // its better to avoid on this and then go 
  // mimic the server reqeust
  const serverRequset = async (data) => {
    // you can supply the data 
    // and you can supply the result
    // you can supply the stateName also 


    console.log(dataa);

    console.log(dataTable);



    // other than just this 
    // we can get data from the datatable and full the prmpt from it



    let res = await sendToServer(base+'sympc/s2',  { 
        id : id ,
        gender : dataTable['state1']['gender'] , 
        age : dataTable['state1']['age'] , 
        rootSymp : dataTable['state1']['rootSymp'], 
        qa : dataa, 
        cat:'s2', 
    } , lang)



    return res;

    /*


[
  {
    id: "a7847491-127e-48b9-88f0-e15e1ee50984",
    gender: "female",
    age: 20,
    qa: {
      "How long have you been experiencing this headache, and has it been constant or does it come and go": "f",
      "What is the severity of the headache on a scale of 1 to 10, and does it affect your daily activities": "f",
      "Have you noticed any triggers that seem to make the headache worse, such as certain foods, stress, or lack of sleep": "f",
      "Have you experienced any other symptoms along with the headache, such as nausea, dizziness, or sensitivity to light": "f",
      "Have you taken any over-the-counter pain medication for the headache, and if so, what was the effectiveness": "f"
    },
    cat: "s2"
  }
]









    */



    // return new Promise((res, rej) => {



    //   setTimeout(() => {
    //     // some data comes from the server

    //     res({

    //       // always one a head
    //       stateName: 'state3',

    //       data: {

    //         // data use feor rendering the views : in this case questions
    //         diagnoseString: 'this is the diagnose string'

    //       }
    //     })


    //   }, 2000);


    //   // setTimeout(() => {
    //   //   // some data comes from the server

    //   //   res({

    //   //     // always one a head
    //   //     stateName: 'state3',

    //   //     data: {

    //   //       // data use feor rendering the views : in this case questions
    //   //       questions: ['first follow up  q  ?', 'second follow up  q ? ', 'third  follow up q ? ', 'second foljsljdsfllow up  q ? ', 'third  followilkjljsdf up q ? ']

    //   //     }
    //   //   })


    //   // }, 2000);


    // });

  }





  const handleForm = async () => {

    console.log(dataa);
    setLoading(() => true);
    let res = await serverRequset({});
    console.log(res);


    console.log(res.data.data.suc[0]['result']);



    // and update the DataTable to the new results for the state 2
    updateDataTable({
      stateName:'state3' , 
      // state 3 is for diagrnose
      //data : res.data.data.suc[0]['result']

      data : res.data.data.suc[0]
      
      // this is the diagnose string data
    });

    // set the currentState to the 2
    updateTrState('state3');


  }


  const handleInputDataChange = (data) => {

    setData((prev) => {
      return {
        ...prev,
        [data.qName]: data.qAnswer

      }
    });
  }



  return (<div>

    {data.questions.map(q => {


      return <QuestionTemplate handleInputDataChange={handleInputDataChange} qString={q} />


    })}


    <Button color="info" onClick={handleForm}>
      {loading ? loadingComponent : 'Continue'}
    </Button>


  </div>)
}




// this is the THIRD STATE

export const State3 = ({ id, data, updateDataTable, updateTrState , lang  , dataTable}) => {
  const [dataa, setData] = useState({});
  const [loading, setLoading] = useState(false);




  // its better to avoid on this and then go 
  // mimic the server reqeust
  const serverRequset = async (data) => {
    // you can supply the data 
    // and you can supply the result
    // you can supply the stateName also 
 
    lang = 'en';
    let res = await sendToServer(base+'sympc/s3',  { 
      id ,
        cat:'s3' , 
        data:data
    } , lang)


    return res;


    // return new Promise((res, rej) => {

    //   setTimeout(() => {
    //     // some data comes from the server

    //     res({

    //       // always one a head
    //       stateName: 'state4',

    //       data: {

    //         // data use feor rendering the views : in this case questions
    //         diagnoseString: 'this is the diagnose string'

    //       }
    //     })


    //   }, 2000);


    // });

  }

  const handleForm = async () => {

    // console.log(dataa);
    setLoading(() => true);
//    let res = await serverRequset(data);
    console.log('state3');
    console.log('data is ');
    console.log(data);
    console.log("dataTable");
    console.log(dataTable);

    console.log(data['back']);
    let res = await serverRequset(dataTable['state3']['back'])


    // // and update the DataTable to the new results for the state 2

    updateDataTable({
      stateName:'state4' , 
//      data : res.data.data.suc[0],  
      data:res.data.data.suc[0]
      //data : res.data.data.suc[0],  
      // data : expertise
    });

    // // set the currentState to the 2
    updateTrState('state4');

  }


  // const handleInputDataChange = (data) => {

  //   setData((prev) => {
  //     return {
  //       ...prev,
  //       [data.qName]: data.qAnswer

  //     }
  //   });
  // }



  return (<div>



    {data['result']}
    {/* data */}
    {/* {data.questions.map(q => {

      


      return <QuestionTemplate handleInputDataChange={handleInputDataChange} qString={q} />


    })} */}




    <Button color="info" onClick={handleForm}>
      {loading ? loadingComponent : 'expertise'}
    </Button>

  </div>)
}





// this is the FORTH STATE
export const State4 = ({ id, data, updateDataTable, updateTrState, dataTable, lang }) => {

  console.log('data in the state 4');
  console.log(data);



  console.log('this is the data for the state 4')

  // let res = await sendToServer('localhost:8070/sympc/s1',  { 
  //   dataObject: { 
  //     gender , 
  //     age, 
  //     rootSymp

  //   }
  // } , lang)


  let ex;

  try { 


    let expr  = anotherHandle(data['result'])
    console.log(expr);
    ex = expr;
    console.log(ex);

  } catch  { 
    ex = ['general practicioner']
  }


  if ((ex.length) == 1 && (ex[0] == 'specialist')) { 

    ex = ['general practicioner']

  }


  ex = _.uniq(ex);


  if (lang == 'fa') { 

  return (

    <div dir="rtl">

      <h1>diagnose</h1>
      <h5>{dataTable['state3']['result']}</h5>

      <h1>expertise</h1>
       

      {/*<h5>{data['result']}</h5>*/}
   
      <h5>
        {ex.map(item => <Badge color="danger"> {item}</Badge>)}
      </h5>
      <h2>--------------------------------------------------</h2>
      

    </div>

  )



  } else { 

  return (
    <div>




      <h1>diagnose</h1>
      <h5>{dataTable['state3']['result']}</h5>

      <h1>expertise</h1>
       

      {/* <h5>{data['result']}</h5> */}
   
      <h5>
        {ex.map(item => <Badge color="danger"> {item}</Badge>)}
      </h5>
      <h2>--------------------------------------------------</h2>
      

    </div>

  )


  }

 
}


const QuestionTemplate = ({ qString, handleInputDataChange }) => {

  return (

    <div>

      <Badge color="info">

        {qString}

      </Badge>


      <Input
        className="w-50"
        id="age"
        name="zip"
        onChange={(e) => {
          handleInputDataChange({

            qName: qString,
            qAnswer: e.target.value

          });

        }}
      />

    </div>)


}



// this is the FIFTH STATE
// final state summery  and overal medical define
export const State5 = ({ id, data, updateDataTable, updateTrState , lang }) => {
  console.log('this is the final state')
  console.log(data.diagnoseString);


  // let res = await sendToServer('localhost:8070/sympc/s1',  { 
  //   dataObject: { 
  //     gender , 
  //     age, 
  //     rootSymp

  //   }
  // } , lang)


  return 'this is the final state'
}

