//import Plotly from './plotly.js/'
var Plotly = require('plotly.js-dist-min')

var config = {
        
    modeBarButtonsToRemove: ['pan2d','select2d','lasso2d','resetScale2d','zoomOut2d']}

    var time = new Date();

    function rand() {
        //var nowData = new Date().now;
        //var datecur = new Date(nowData);
        //return datecur.getSeconds();
        return Math.random();
    }


    
    var data = [{
        x: [time],
        y: [rand()],
        mode: 'lines',
        line: {color: '#80CAF6'}
    }]
    Plotly.newPlot("gd", data, config);
    /*
 

    var xArray = [50,60,70,80,90,100,110,120,130,140,150];
    var yArray = [7,8,8,9,9,9,10,11,14,14,15];
    
    // Define Data
    var data = [{
      x: xArray,
      y: yArray,
      mode:"markers",
      type:"scatter"
    }];
    
    // Define Layout
    var layout = {
      xaxis: {range: [400, 160], title: "Square Meters"},
      yaxis: {range: [500, 16], title: "Price in Millions"},
      title: "House Prices vs. Size"
    };
    
    Plotly.newPlot("gd", data, layout);
    */