//
// Coding Train series
// https://www.youtube.com/watch?v=RfMkdvN-23o
// 1.2 tabular data
//
console.log("CSV games")

workFile = "test.csv";

getData(workFile);

// async function; async calls w/await keyword
async function getData(theFile) {
    const resp = await fetch(theFile);
    const data = await resp.text();
    console.log(data);    
    // lots of modules to parse csv files; d3.js p5.js etc
    // ... just doing it ourselves with these methods:
    // ... trim() for trailing empty lines
    // ... split() to break text into an array by newlines
    // ... ... btw .. I WANTED to use the regex syntax in the split!  video time 9:30
    // ... slice() the array from element 1 forward ...
    const table = data.trim().split(/\n/).slice(1);
    //console.log(table);    

    // video caveot discussion about data and cleaning; data w/commas, etc
    table.forEach(row => {
        const columns = row.split(',')
        const year = columns[0];
        const temp = columns[1];
        console.log(year, temp)
    })

}

