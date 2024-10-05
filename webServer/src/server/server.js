/*
    commented

    # we can assemble the prompt here  from the raw data that comes from the ui

*/
import { Elysia } from 'elysia'
import { base, misc, users } from '../lvl/subs'
import { uuidGen } from '../helpers/userSession';
import { assmble, checkTokenLength } from '../helpers/assemble';
import { join } from 'lodash';
import { translateServer, llmReq_N } from './llmTcpResolver/llmServerReq';
import { timeStamp, backToDate } from '../helpers/timeUtils';
import { handleQ } from '../helpers/handleQ';
import { cors } from '@elysiajs/cors'
import { chooseTemplateOnState, templateString } from '../p-template/promptTemplate';
import { inputSchema, outputSchema } from './IType';
import { swagger } from '@elysiajs/swagger'


// handle the config file


// setup swagger config
const app = new Elysia();
app.use(cors())
app.use(swagger({
    // path: '/v1/swagger',
    documentation: {
        info: {
            title: 'Noyaab Symptom Checker Server : Proxy to llmTCP',
            description: 'Use to Develop For demo : Single Use ONLY',
            version: '1.0.0'
        },
        tags: [
            { name: 'App-demo', description: 'General endpoint : demo use' },
        ]
    }



    // paths: {
    //     "/sympc/{state}": {
    //         post: {
    //             requestBody: {
    //                 content: {
    //                     "application/json": {
    //                         schema: inputSchema
    //                     }
    //                 }
    //             },
    //               responses: {
    //                 200: {
    //                   description: "OK",
    //                    content: {
    //                     "application/json": {
    //                       schema: outputSchema
    //                     }
    //                   }
    //                 }  
    //               }
    //         }
    //     }
    // }

}));




// // a single user from the databases diganosed user
// app.get('/getUser/:userId', async (ctx) => {
//     let userId = ctx.params.userId;

//     if (userId) {
//         let res = await base.getValue(userId, users)
//         if (res) {
//             console.log('existed and then return to the user')
//             return handleResponseObject(true, 0, 'ok', { id: userId, data: JSON.parse(res) })
//         }

//         console.log('not existed in the db')
//         return handleResponseObject(false, 1, 'not existed', { id: userId, data: null })
//     }

//     console.log('no user id is supplied')
//     return handleResponseObject(false, 2, 'no sufficient arguments : id ', { id: null, data: null })
// })




// // delete a user from the db
// app.delete('/delete/:userId', async (ctx) => {

//     let userId = ctx.params.userId;

//     if (userId) {
//         // check it in the db;
//         let res = await base.getValue(userId, users)
//         if (res) {

//             res = await base.delValue(userId, users)

//             if (res) {


//                 console.log("successfully deleting the value")
//                 return handleResponseObject(true, 0, 'deleted suc', { id: userId })


//             }


//             console.log('existed but we have error in deleting the value in the db try again ')
//             return handleResponseObject(false, 2, 'existed error deleting .. try again in few seconds', { id: userId })


//         } else {

//             console.log("the conversation is not exists")
//             return handleResponseObject(false, 1, 'wrong id : NOT EXISTED', { id: userId })

//         }
//     }

//     console.log('no id supplied by the uri route')

//     return handleResponseObject(false, 3, 'no id supplied', { id: null })


// })


// this is the main endpoint for handling the users in the front end stuffs
// its state less and just response to the bunch of requests as a batch
// for now we just the set the flag of the fa oen and then after the overal working of the system we will get back
// this must works in batch


app.post('/sympc/:state', async (ctx) => {
    console.log(ctx);

    let translateFlag = false;
    console.log(ctx.body.context);
    console.log(ctx.body);
    console.log(ctx.body.lang);


    console.log('got one req');

    // s1, s2 , s3, s4 , s5
    let state = ctx.params.state;

    // console.log(state);
    console.log(state);

    let ts;


    let body = ctx.body

    console.log(body.context[0].dataObject);
    // sanity check and input validation is very important here

    // if you need to translate you have first translate the dataobject segement and then put it in the template string


    // if (translateFlag) { 

    //     let translateContext =  { 
    //         to:'en', 
    //         context:body.context
    //     }


    //     let translate = await translateServer("localhost", 6040, { context: translateContext });

    //     // then we have to fill the dataForTheTemplate : with the english version of it 
    //     console.log(translate);

    // }

    // you need to datafortheTemplate the englihs version of it

    // we need to change the data for the tempalte
    // go the english vesion of the body for tempalte


    // if body is there
    if (body) {

        console.log('got you request');
        console.log(body.context);



        // deafult
        let lang = 'en';




        // check for the translate flag
        if (body.lang) {
            //translateFlag = body.translate;
            lang = body.lang;

            if (lang == 'fa') {


                // need to change it here : dataFrotheTemplate

                translateFlag = true; // set on the root level of execution context

            }

        }



        // create the batch for the current request
        // create a batch for what ? for the current State : like s1 batch s2 batch : we need to think in batch : because we think in gpus
        let batch = createNewBatch();



        // // create a translate object : use to convert the persian to english for llm consumptions



        // translate from persian to english

        // req to the translate server for per to en 

        // means the user enter something in persian
        let res;
        if (translateFlag) {

            // if the language is fa : we have to convert the user input first to english

            let translateContext = {

                to: 'en',
                context: body.context,
                mode: 'sep'
                // body.context[0].promptValue
            }



            let translate = await translateServer(Bun.env.TSH, Number(Bun.env.TSP), { context: translateContext });



            translate = JSON.parse(translate.data.toString())

            console.log(translate);


            //let ts ;
            if (state) {
                console.log('do we come here');

                ts = chooseTemplateOnState(state);

                // for the state this will choose the state 2


                // old persian data
                //let dataForTheTemplate = body.context[0]
                // let datasForTheTemplate  = body.context;  // [] , [] , []
                // we need to checkout the hyper :



                // if you want to think in batch treat everything as batch
                ts = templateString(ts, translate[0], {
                    state: state
                });
                console.log(ts);
                // this is the prompt 


            }



            console.log('data after the translation in sep mode');
            // let pv  = translate.context.context[0].promptValue
            // pv = 'Previous conversation: from the provided chatHistory : ' + pv;
            // translate.context.context[0].promptValue = pv;

            body.context[0].promptValue = ts;
            const context = {

                // later it was body .context
                // context:[translate], 
                // we need to iterate on this. and add prev conver to it 
                context: body.context,
                reqType: 'batch'
            }




            // we need to first got it down to the template String

            console.log(context);


            res = await llmReq_N(Bun.env.LSH, Number(Bun.env.LSP), { context, tasks: [] });

        } else {
            console.log("do we go here or not ");
            // no need for translation here

            // we go with eng to eng one

            let dataForTheTemplate = body.context[0]
            console.log('the data for the template is');
            console.log(dataForTheTemplate);
            ts = chooseTemplateOnState(state);
            ts = templateString(ts, dataForTheTemplate, {
                state: state

            });


            console.log('body context i s');

            // need to create teh template string here. 

            // do bad things here. 
            // you need to think in batches
            body.context[0].promptValue = ts;

            const context = {
                context: body.context,
                reqType: 'batch'

            }
            console.log('llm server host');
            console.log(typeof (Bun.env.LSH))
            console.log('llm server port');
            console.log(typeof (Bun.env.LSP));

            res = await llmReq_N(Bun.env.LSH, Number(Bun.env.LSP), { context, tasks: [] });

        }

        // we have the res in  one or two options

        // const context = { 
        //     context : body.context , 
        //     reqType: 'batch'

        // }
        // console.log('contexst is ');
        //         console.log(context);


        // req the en version of the prompt to the llm 
        //let res = await llmReq_N("localhost", 9999, { context, tasks: [] });


        console.log(res);




        if (res.stat) {

            let data = res.data.toString();
            data = JSON.parse(data)

            console.log(data);
            data.translate = '';


            console.log(data);
            if (data.responseStatus) {

                console.log('do we ere');
                batch.Date = backToDate(timeStamp());
                let translate;


                if (translateFlag) {

                    console.log('look at this');
                    console.log(data.suc[0].result);

                    // translate llm stuffs back to persian : fa
                    const translateContext = {
                        to: 'fa',
                        context: [data.suc[0].result]
                        // context : data.suc
                        // iterate and get teh result for reahc
                    }



                    if (state == 's1') {
                        // we need to parse the questions
                        translateContext.context = handleQ(data.suc[0].result);

                    }


                    translate = await translateServer(Bun.env.TSH, Number(Bun.env.TSP), { context: translateContext });
                    console.log('do we comes here or not');
                    console.log('we wwe we we');


                    let t = JSON.parse(translate.data.toString());
                    data.translate = t.translated // later gonna be an array
                    data.suc[0].back = data.suc[0].result;
                    data.suc[0].result = t.translated;
                    // english version of the converted results

                } else {


                    data.suc[0].back = data.suc[0].result;

                }


                // we dont think in batch here
                if (state == 's1' && (!translateFlag)) {
                    data.suc[0].result = handleQ(data.suc[0].result);
                }



                batch.result = data;

                // db io stuffs
                console.log('attemp to write');
                let dbBatchWrite = await base.setValue(batch.batchId, JSON.stringify(batch), misc);
                console.log('wrote to the db');
                console.log(dbBatchWrite);
                if (dbBatchWrite) {
                    console.log("batch written to the db");
                    return handleResponseObject(true, 0, 'ok', { id: batch.batchId, data: data })

                } else {

                    console.log('canot write to the db');
                    return handleResponseObject(false, 1, ' request again later', { id: null });


                }

            }


            return handleResponseObject(false, 5, 'out of context : llm error', { id: null });


        }

        console.log('canot handle the request');
        return handleResponseObject(false, 2, 'canot handle your requst', { id: null });

    } else {

        console.log('the body is not supplied');
        return handleResponseObject(false, 3, 'canot handle the request : not suff body ', { id: null });

    }


}, {

    detail: {
        tags: ['App-demo'],
        description: 'main endpoint interfacing the llm by providing differnet set of states :  basePath/s1 suppliedBody{id, gender, age , rootsymp}  base/s2 {...s1body, qa}  base/s3 {...s1body, data} ', 
        "requestBody": {
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "required": ["context", "lang"],
                        "properties": {
                            "context": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "id": { "type": "string" , "example" : '89kdsw897239743dflkjsdf1232'},
                                        "gender": { "type": "string" , "example" : "male"},
                                        "age": { "type": "integer" , "example" : 23},
                                        "rootSymp": { "type": "string" , "example" : "i have a headache"},
                                        "qa" :  { 
                                            "type": "object",
                                            "example" : {
                                                "q1":"ans1"
                                            }
                                        } , 
                                        "data" : {
                                            "type" : 'string'
                                        }, 
                                        "cat": { "type": "string" , "example" : "s1" }
                                    },
                                    "required": ["id", "gender", "age", "rootSymp", "cat"]
                                }
                            },
                            "lang": { "type": "string" , "example" : 'en' }
                        }
                    }
                }
            }
        },
        "responses": {
            "200": {
                "description": "OK"
            }
        },

        parameters: [
            // {
            //     in: 'body',
            //     name: 'body',
            //     description: 'body requset',

            //     schema: {
      
            //             "type": "object",
            //             "required": ["context", "lang"],
            //             "properties": {
            //                 "context": {
            //                     "type": "array",
            //                     "items": {
            //                         "type": "object",
            //                         "properties": {
            //                             "id": { "type": "string" , "example" : '89kdsw897239743dflkjsdf1232'},
            //                             "gender": { "type": "string" , "example" : "male"},
            //                             "age": { "type": "integer" , "example" : 23},
            //                             "rootSymp": { "type": "string" , "example" : "i have a headache"},
            //                             "qa" :  { 
            //                                 "type": "object",
            //                                 "example" : {
            //                                     "q1":"ans1"
            //                                 }
            //                             } , 
            //                             "data" : {
            //                                 "type" : 'object'
            //                             }, 
            //                             "cat": { "type": "string" , "example" : "s1" }
            //                         },
            //                         "required": ["id", "gender", "age", "rootSymp", "cat"]
            //                     }
            //                 },
            //                 "lang": { "type": "string" , "example" : 'en' }
            //             }
                    
            //         }
            // }, 
        ],

        externalDocs: {
            "description": "technical details",
            "url": "https://kb.nobaan.org/display/NOYAAB/Noyaab"
        },
        responses: [
            {

                Code: 200,
                description: 'ok',
                headers: {
                    "response-code": {
                        "description": "if suc",
                        "code": "0",
                        "type": "integer"
                    },
                }

            },
        ]
    }
})


app.listen(Number(Bun.env.PORT), () => {
    console.log(`listening on ${Bun.env.PORT}`)
    console.log(uuidGen('I') + ' ' + 'session server');
})



// helper


// handle response stuffs
function handleResponseObject(responseStatus, responseCode, responseMessage, resInfo = {}) {


    return JSON.stringify({
        responseStatus,
        responseCode,
        responseMessage,
        data: resInfo

    });

}


// gonna result input prompt to output
function resolvePromptInputToOutput(llmRes) {
    return {
        input: llmRes.input,
        output: llmRes.output[0],
        date: backToDate(timeStamp())
    }


}





// create context for the current chat
function createContext(arr) {

    const context = arr.map(item => {

        return {
            id: item.id,

            promptValue: item.promptValue
        }

    });

    return context

}



// create a single batch object
function createNewBatch() {


    const batchId = uuidGen("I");

    return {
        batchId,

        result: []



    }
}



