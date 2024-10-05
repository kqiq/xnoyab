import { flatten } from "lodash";
let specs = [ "obstetrics_and_gynecology", "infertility", "pediatrics",
  "immunology", "pulmonology_or_respiratory_medicine",
  "cardiology", "general_practitioner", "surgery", "otorhinolaryngology",
  "plastic_surgery", "urology", "neurosurgery", "nephrology",
  "hepatology", "internal_medicine", "infectious_disease",
  "oncology", "rheumatology", "endocrinology", "orthopaedics",
  "neurology", "ophthalmology", "radiology", "oral_and_dental_medicine",
  "dietetics", "psychiatry", "pathology", "dermatology", "radiotherapy","orthopedic",
  "occupational_medicine", "psychology", "alternative_medicine",
  "geriatrics", "sports_medicine", "family_medicine", "genetics_and_biotechnology",
  "anesthesiology", "basic_sciences", "forensic_medicine",
  "nuclear_medicine", "emergency_medicine", "pharmacology",
  "social_medicine", "aerospace", "veterinary", "physiotherapy"
]


function extractExpertise(targetString, specialties) {
  const foundExpertise = [];

  // Convert specialties array to lowercase for case-insensitive matching
  const lowerSpecs = specialties.map(spec => spec.toLowerCase());

  // Check for each expertise in the target string
  lowerSpecs.forEach((specialty, index) => {
    const regex = new RegExp(`\\b${specialty.replace('_', ' ')}\\b`, 'i');

    if (regex.test(targetString)) {
      foundExpertise.push(specs[index]);
    }
  });

  return foundExpertise;
}

export function anotherHandle(str) { 

  // let st = trimAndRemovePunctuation(str).split(" ");
  
  // console.log(st)

  console.log('medical specs');
  let res = extractMedicalSpecialists(str);
  console.log(res);

  console.log('expertise');

  let res2 = extractExpertise(str, specs);
  console.log(res2);



  res.push(res2);
  console.log(res);


  return flatten(res)


}

function extractMedicalSpecialists(inputString) {
  // Regular expression to match words ending with "-ist"
  const regex = /\b\w+ist\b/g;

  // Extract matches from the input string
  const matches = inputString.match(regex);

  // Return the array of matches
  return matches || [];
}


 export const handleQQ = (context) => {

    const regex = /(\d+\.)\s*([^?]+)/g;
  
    const questions = [];

    for (let match of context.matchAll(regex)) {
      questions.push(match[2]);
    }

    console.log(questions); // Output: ["what's your name?", "how old are you?", "are you ok?"])


    let subRes; 

    return questions;


    //  let rs = questions.map(q =>{ 

    //     subRes = q.split(' ');

    //     subRes.map(s =>{
    //         if (specs.includes(s)) { 

    //             return s;

    //         }
    //     });

    // });


   // return rs;

    // // only return the specs
    // return questions.map(q =>{
    //     subRes = q.split(':');
    //     return subRes[0];
    // });
  };



