// this file is for handling and creating the specs


async function loadSpec(path) { 



    const file = Bun.file(path);

    const contents = await file.json()

    return contents;

}



async function createSpecString(specObj) { 




    let specs = specObj.map(item =>{
        return item['slug'];
    });


    return specs;



    // iterate over the object 
    //create a comman sepereate stringb out of it 

}




let res = await loadSpec('../../spec.json');
res = await createSpecString(res);
console.log(res);
