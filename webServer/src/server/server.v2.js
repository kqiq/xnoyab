
import { Elysia } from 'elysia'
import { base, misc, users } from '../lvl/subs'
import { uuidGen } from '../helpers/userSession';
import { assmble, checkTokenLength } from '../helpers/assemble';
import { join } from 'lodash';
import { translateServer, llmReq_N } from './llmTcpResolver/llmServerReq';
import { timeStamp, backToDate } from '../helpers/timeUtils';
import { handleQ } from '../helpers/handleQ';
import { chooseTemplateOnState, templateString } from '../p-template/promptTemplate';
import { inputSchema, outputSchema } from './IType';



// logger setup
import { logger } from '@bogeychan/elysia-logger';
import { fileLogger } from '@bogeychan/elysia-logger';


// swagger doc setup
import { swagger } from '@elysiajs/swagger'


// http headers. 
import { helmet } from 'elysia-helmet';


// get user ip 
import { ip } from "elysia-ip";


// rate limit
import { rateLimit } from 'elysia-rate-limit'



// cors setup  : origin stuffs
import { cors } from '@elysiajs/cors'


fileLogger({
  file: './my.log'
});


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
})).use(helmet()).use(ip()).use(logger({
    level: 'error'
})).use(rateLimit())




app.get('/' , (ctx) =>{
    console.log(ctx.added);

    ctx.end  = 'ennnded'
    return ctx.added


}, {
      beforeHandle: (ctx) => {
        ctx.added = 'keihan';
        // must return nothing here.
        // if you return here you dont reach the main handler. 

        
    }, 

    afterHandle : ({end})=>{
        console.log('do some clean up after handlign the user input');
        console.log(end);
        // must return nothing here.
    }
}).listen(3000);

