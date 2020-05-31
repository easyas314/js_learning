//
// Coding Train series
// https://www.youtube.com/watch?v=5-ptp9tRApM
// 1.3 Charting tabular data
// options! d3.js j5.js 'native' Canvas API  Chart.js
//
// previously in html <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
// Install: go to this site
// https://www.chartjs.org
// ... <Get Started>
// ... import via CDN (content delivery network)
// ... takes you to ... then find the most recent version, click (yikes!), copy the url
// ... put in the html script tag
// ... also need a canvas element in the html to display the chart
// ... maybe grab code from the  Chartjs get started page

console.log("CSV charting games");

var myXlabels = [];
var myYdata = [];

chartIt();

async function chartIt() {

    await getData();
    console.log('waited out the getData.')

    //var ctx = document.getElementById("framus").getContext('2d');
    const mycanvas = document.getElementById("framus");
    //const ctx = mycanvas.getContext('2d');
    ctx = mycanvas;
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            labels: myXlabels,
            datasets: [{
                //label: '# of Votes',
                label: 'Global Temperature',
                //data: [12, 19, 3, 5, 2, 3],
                data: myYdata,
                fill: false,
                //backgroundColor: [ 'rgba(255, 99, 132, 0.2)', ],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                //borderColor: [ 'rgba(255, 99, 132, 1)', ],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
    });
}

//getData(workFile);

// async function; async calls w/await keyword
async function getData() {
    const resp = await fetch("ZonAnn.Ts+dSST.csv");
    const data = await resp.text();
    //console.log(data);    
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
        myXlabels.push(year);
        const temp = columns[1];
        myYdata.push(parseFloat(temp) + 14);
        console.log(year, temp);
    })

}

