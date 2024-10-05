
// const test = 'حتما، من خوشحال می شوم که به شما کمک کنم علائم بیماری تان را تشخیص دهید. به عنوان یک پزشک، من چند سوال از شما می پرسم تا اطلاعات بیشتری در مورد دردتان کسب کنم و به من کمک کنید تشخیص دقیقی در مورد آن ها بدهم. لطفا تا جایی که ممکن است دقیق و دقیق به این سوال ها پاسخ دهید. آیا فعالیت ها و کارهایی که درد را بهتر یا بدتر می کند توضیح دهید. برای مثال، دراز کشیدن یا نشستن باعث درد می شود؟ آیا در طول این مدت تحت شرایط پزشکی مشابهی قرار گرفته اید؟ آیا در طول این مدت تحت شرایط پزشکی مشابهی قرار گرفته اید؟ آیا در طول این مدت داروی مصرف کرده اید؟ آیا در این مدت داروی مصرف کرده اید؟ آیا در این مدت داروی مصرف کرده اید؟ آیا در این مدت داروی مصرف کرده اید؟ آیا در این مدت داروی مصرف کرده اید؟ آیا در این مدت داروی مصرف کرده اید؟ آیا در این مدت داروی مصرف کرده اید؟ آیا در این مدت داروی مصرف کرده اید؟ لطفا این سوال ها را دقیق و دقیق جواب دهید. من از این اطلاعات برای تشخیص بیماری شما استفاده خواهم کرد و توصیه های مناسبی خواهم کرد'

// // this is always working
//  const handleQ = (context) => {

//     const regex = /(\d+\.)\s*([^?]+)/g;
  
//     const questions = [];

//     for (let match of context.matchAll(regex)) {
//       questions.push(match[2]);
//     }

//     console.log(questions); // Output: ["what's your name?", "how old are you?", "are you ok?"])
//     return questions;


//   };


// function getQuestions(str) {
//   const regex = /(\?\s*(.*?)\?)>/g;
//   const questions = [];
  
//   let match;
//   while ((match = str.match(regex))) {
//     questions.push(match[2].trim());
//   }
  
//   return questions;
// }


// const str = "Sure, I'd be happy to help you diagnose your symptoms. As a doctor, I will ask you several questions to gather more information about your pain and help me make a more accurate diagnosis. Please answer my questions as thoroughly and accurately as possible, and avoid any expressions of emotion or emojis.\n\nHere are my 8 questions for you:\n\n1. Can you describe the location and intensity of your stomach pain? Is it constant or does it come and go?\n2. When did you first notice the pain, and has it been continuous or does it come and go?\n3. What activities or actions make the pain better or worse? For example, does lying down or sitting down make the pain better or worse?\n4. Have you experienced any other symptoms such as nausea, vomiting, fever, or changes in your bowel movements?\n5. Have you recently traveled or been exposed to anyone with similar symptoms?\n6. Have you had any recent changes in your diet or eating habits?\n7. Do you have a family history of any medical conditions that may be related to your symptoms?\n8. Have you taken any medications or supplements recently that may be related to your symptoms?\n\nPlease answer these questions as accurately and thoroughly as possible, and I will use this information to help make a diagnosis and recommend appropriate treatment"
// const questions = handleQ(str);
// console.log(questions);


// let test = 'the following diagnosisi is $data'
// let objectResolver =  { 
//   age : 23 , 
//   name:'keihan', 
//   data:'targetValue', 
//   job:'programmer'

// }


// let res ; 
// for (let o in objectResolver) { 
//   res = test.replace(`${o}` , objectResolver[o]));


// }


export function extractExpertise(str) {

  // Regular expression to match text between parentheses
  var regex = /\(([^)]+)\)/;

  // Extract the value between parentheses
  var match = str.match(regex);
  return match

}



function extractMedicalSpecialists(inputString) {
  // Regular expression to match words ending with "-ist"
  const regex = /\b\w+ist\b/g;

  // Extract matches from the input string
  const matches = inputString.match(regex);

  // Return the array of matches
  return matches || [];
}




let specs = [ "obstetrics_and_gynecology", "infertility", "pediatrics",
  "immunology", "pulmonology_or_respiratory_medicine",
  "cardiology", "general_practitioner", "surgery", "otorhinolaryngology",
  "plastic_surgery", "urology", "neurosurgery", "nephrology",
  "hepatology", "internal_medicine", "infectious_disease",
  "oncology", "rheumatology", "endocrinology", "orthopedic",
  "neurology", "ophthalmology", "radiology", "oral_and_dental_medicine",
  "dietetics", "psychiatry", "pathology", "dermatology", "radiotherapy",
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






// Example usage:
const inputString = "I visited a cardiologist and an endocrinologist yesterday.";
const specialists = extractMedicalSpecialists(inputString);

console.log(specialists);






