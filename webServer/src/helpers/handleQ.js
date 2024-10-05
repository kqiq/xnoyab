 export const handleQ = (context) => {

    const regex = /(\d+\.)\s*([^?]+)/g;
  
    const questions = [];

    for (let match of context.matchAll(regex)) {
      questions.push(match[2]);
    }

    console.log(questions); // Output: ["what's your name?", "how old are you?", "are you ok?"])
    return questions;


  };


// let res = highlightQuestions("depends on the provided info first 1.what's your name? 2.how old are you? 3.are you ok?");

// let ress = hhighlightQuestions("depends on the provided info first 1.what's your name? 2.how old are you? 3.are you ok?", '<h1>');

// console.log(res);
// console.log(ress)
// fn2("depends on the provided info first what's your name? how old are you? .are you ok?");


let test ="Neurology: A neurologist would be able to provide further evaluation and management of the patient's migraine headaches. They would be able to determine the underlying cause of the headaches and recommend appropriate treatment options, such as medication or lifestyle changes. 2. Physical Medicine and Rehabilitation: A physiatrist would be able to provide non-surgical treatment options for the patient's headaches, such as physical therapy, pain management, and rehabilitation. They would also be able to assess the patient's overall physical health and provide recommendations for maintaining good health. Therefore, the two related specialists for the patient's diagnosis of Migraine Headache would be Neurology and Physical Medicine and Rehabilitation."
let res = handleQ(test);
console.log(res);