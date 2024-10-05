import { truncate } from "lodash";

export function chooseTemplateOnState(state)  { 

    switch(state)  { 
        case 's1' : 
        
            let templateString = "im $gender $age years old and $rootSymp"
            return templateString;
        case 's2' : 
        // for now dont do it  : and forgot this : we can do more cool things
            return 'im $gender $age years old and $rootSymp , my answers to your questions are  '
            break; 
        case 's3' : 

            return 'the following diagnosisi is $data'
            break;
        
        case 's4' : 

            return 'this si teh string template for the s4'
            break;
        
        case 's5' : 
            return 'this is the string template for the s5'
            break;
    }

}

// order is not matter but you have to check that temlate string target values be in objectREsolver

export function templateString(templateString, objectResolver, hyper) { 
    // the placeholders muset match the objectResolver properties
    // this is going to be the templateString

    

    console.log(templateString, objectResolver);
    let template = templateString

    if (hyper.state == 's3' ) { 


        for (let prop in objectResolver) { 

            if (prop == 'data') { 

                template =template.replace(`$${prop}`, objectResolver[prop])
                break;

            }



        }

        return template;

    }



    for (let prop in objectResolver) { 



        template =template.replace(`$${prop}`, objectResolver[prop])

    }


    // hyper.obj
    console.log('do we got here in the hyper state');

    if (checkHyperState(hyper.state)) { 
        // means we have some hyper
        // we need to do the hyper
        console.log('the hyper state is ' + hyper.state);


        for (let prop in objectResolver.qa) { 
            template += `doctor : ${prop} , paitient:${objectResolver.qa[prop]}`
        }


        // and tehn return the hyper template
    



        console.log('the generated template is ? ');
        console.log(template);

        return template;
        

    } 





    // what hyper will : will only append the stuffs at the end of the template string


    return template;

}


function checkHyperState(state) { 
    if (state == 's2' ) { 
        return true;

    }
    return false;
}


// let res = templateString("$target is going to $location on $date",  { target:'mashhahd', location:'iran', date:'2133'});
// console.log(res);


// function templateEngine(string, targetObject) { 

    
//     //const template = `This is the sample string with age ${age} with gender ${gender} with root symp ${rootSymptom}`;

//     const output = string.format({ age, gender, rootSymptom });
//     return output;


// }
