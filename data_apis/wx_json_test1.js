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
                fill: false,
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

function getDayFromTime(time) {
    var dt = new Date(time * 1000);
    return moment.weekdaysShort(dt.getDay());
};

// VERY basic fetcher
async function getData(dSource) {
    const resp = await fetch(dSource);
    const data = await resp.json();
    return data
};

// async function; async calls w/await keyword
async function getWxData(dSource) {
    const resp = await fetch(dSource);
    const data = await resp.json();
    console.log(`Updated time: ${data.properties.updated}`);    
    console.log(`..moment day: ${getDayFromTime(data.properties.updated)}`);
    console.log(`Period object: ${data.properties.periods[1]}`);
    console.log(data.properties.periods[1]);
    console.log(`Period endTime: ${data.properties.periods[1].endTime}`);
    console.log(`..moment end  : ${Date(data.properties.periods[1].endTime)}`);
    
    // lots of modules to parse csv files; d3.js p5.js etc
    // ... just doing it ourselves with these methods:
    // ... trim() for trailing empty lines
    // ... split() to break text into an array by newlines
    // ... ... btw .. I WANTED to use the regex syntax in the split!  video time 9:30
    // ... slice() the array from element 1 forward ...
    //const table = data.trim().split(/\n/).slice(1);
    //console.log(table);    

    // video caveot discussion about data and cleaning; data w/commas, etc
    wxArray = [];
    wxDays = [];
    currDay = getDayFromTime(data.properties.updated);
    prevDay = '';
    data.properties.periods.forEach(element => {
        const eleNum = element.number;
        const eleDay = getDayFromTime(element.startTime);
        const eleStart = new Date(element.startTime);
        const eleTemp = element.temperature;
        const eleSF = element.shortForecast;

        if (eleDay != prevDay) {
            dayMax =
            dayMin = Math.min(dayMin, eleTemp)
            dayMax = Math.max(dayMax, eleTemp)
            wxDays.push(eleDay)
            
        }
        wxArray.push({eleNum, eleStart, eleDay, eleTemp, eleSF})
    });

    console.log(wxArray);
    // table.forEach(row => {
    //     const columns = row.split(',')
    //     const year = columns[0];
    //     myXlabels.push(year);
    //     const temp = columns[1];
    //     myYdata.push(parseFloat(temp) + 14);
    //     console.log(year, temp);
    // })

}

//
const data_source = "wx_grid_fore_hrly.json"
var myXlabels = [];
var myYdata = [];

//chartIt();

async function getWxGovURLs(wxCtl) {
    // wxCtl.initialLoadDelay here ?
    wxPoints = await getData(`${wxCtl.base_url}/points/${wxCtl.lat},${wxCtl.lon}`);
    wxCtl.forecast = wxPoints.properties.forecast;
    wxCtl.forecastHourly = wxPoints.properties.forecastHourly;
    wxCtl.forecastGridData = wxPoints.properties.forecastGridData;
    wxCtl.observationStations = wxPoints.properties.observationStations;
    wxStations = await getData(wxCtl.observationStations);
    wxCtl.stationObs = wxStations.features[0].id + "/observations/latest";
    console.log(wxCtl);
}

/////////////////////////////////////////////////////////////

// weatherGov has multiple endpoints for data
var wxGovCtl = {
    base_url: "https://api.weather.gov",
    lat: 34.844740, //REQUIRED
    lon: -82.394430, //REQUIRED
    initialLoadDelay: 1000, // .5 sec
    forecast: "tbd", // url
    forecastHourly: "tbd", // url
    forecastGridData: "tbd", // url
    observationStations: "tbd", // url
    stationObs: "/station/{stationId}/observations/latest" // url
};

getWxGovURLs(wxGovCtl);
// get GridData -> obsStations -> stationObs


