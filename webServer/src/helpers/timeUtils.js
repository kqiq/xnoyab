// commented
// get the uniq timestamp
export function timeStamp() {
    return new Date().getTime();

}


// get back to the date of unix timestamp
export function backToDate(ts , format = 'fa-IR') {

    // you can set the format to 'en'; if you want
    if (format !== 'fa-IR') { 

        format = 'en'; 
    }
    return new Date(ts).toLocaleString(format, { timeZone: "Asia/Tehran" });

}



// use to get timestamp of certain events in the db and other sort of stuffs


