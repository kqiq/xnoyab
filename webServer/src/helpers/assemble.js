// Requiring the lodash library
import _ from 'lodash'



// for now we dont think about the limit
export function assmble(arr) {

    let subArr = arr.map(item => {
        return [item.input, item.output]
    })

    subArr = _.flatten(subArr)
    let tokens = subArr.join(' ')
    let tk = tokens.split(' ')
    return tk


}

// check the token length
export function checkTokenLength(tokens,limit) {

    if (tokens.split(' ').length <= limit) {


        console.log('token length is ok ')

        return {
            stat: true,
            value : tokens
        }
    }



    console.log('token length is more thant limit of window context token')
    return  {

        stat: false,
            value : tokens
        }


}





// just code it to test it in the back end not use in teh sever logic yet
export function assembleChatLogs  (chatLog, tokenLimit)  {
    let currentToken = '';

    while (checkTokenLength(currentToken, tokenLimit).stat) {
        console.log('we go here');
        if (arr.length ==0 ) {
            // reach the end of the array but the limit is not satisfied
            console.log('reach the end of the array but the token limit is not satisfied');
            break;

        }
          const lastItem = arr.pop();
          currentToken +=` ${lastItem.name}` 
    }


    console.log('current tokens with approperiate length');
    console.log(currentToken);



}






