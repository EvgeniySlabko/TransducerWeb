
//import * as moment from 'moment';

import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming'
import { Chart, registerables } from 'chart.js';
import { DateTime } from '../dist/bundle';

Chart.register(zoomPlugin);
Chart.register(StreamingPlugin);
Chart.register(...registerables);

Chart.defaults.set('plugins.streaming', {
    duration: 20000
  });

var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

function randomScalingFactor() : number {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

class myChart2{
    
    private stremingChart : Chart;

    private buffer: any = [];

    public constructor(canvas : HTMLCanvasElement)
    {
        var config : any= {
            type: 'line',
            data: {
                datasets: [
                  {
                    label: 'データセット1 (線形補間)',
                    borderDash: [8, 4],
                    data: []
                  },
                  {
                    label: 'データセット2 (キュービック補間)',
                    cubicInterpolationMode: 'monotone',
                    data: []
                  }
                ]
              },
            options: {
              scales: {
                x: {
                  type: 'realtime',
                  realtime: {
                    duration: 20000,
                    refresh: 100,
                    delay: 2000,
                    onRefresh: onRefresh
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: '値'
                  }
                }
              },
              interaction: {
                intersect: false
              },
              plugins: {
                zoom: {
                  pan: {
                    enabled: true,
                    mode: 'x'
                  },
                  zoom: {
                    pinch: {
                      enabled: true
                    },
                    wheel: {
                      enabled: true
                    },
                    mode: 'x'
                  },

                }
              }
            }
          };

        //var ctx = canvas.getContext("2d");
        this.stremingChart = new Chart(canvas, config);
		(<any>window).myChart = this.stremingChart;
        (<any>this.stremingChart).options.plugins.streaming.pause = true;
        this.stremingChart.ctx.canvas.addEventListener('onZoomStart', () => 
        {
            console.log("zoom start");
        });

        this.stremingChart.ctx.canvas.addEventListener('onZoomComplete', (arg: any) => 
        {
            console.log("zoom comlete");
        });
    }

    public PushData(value: number)
    {
        //var d = this.stremingChart.data.datasets[0].data;
        
        let valuePbj = {
            x: Date.now(),
            y: value,
          };
          this.buffer.push(valuePbj);

          
        var time1 = performance.now();
        this.stremingChart.data.datasets[0].data = this.buffer;
        var time2 = performance.now();
        this.stremingChart.update('quiet');
        //this.stremingChart.data.datasets[0].data = [];
        console.log(time2 - time1);
    }

    private onRefresh = (c: any) => {
        const now = Date.now();
        c.data.datasets.forEach((dataset: { data: { x: number; y: number; }[]; }) => {
          dataset.data.push({
            x: now,
            y: (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100)
          });
        });
      };
}



  
export default myChart2;





function onRefresh(chart: Chart) : void {
    //var result = GetBytes(1);
	//var b = new Buffer(1);
	//var value = torqueBuff.pop();
	var value : number = randomScalingFactor();
	if (value != null)
	{
		var now = Date.now();
		chart.data.datasets.forEach(function(dataset) : void{
			dataset.data.push({
				x: now,
				y: value
			});
		});
	}
}

/*
var color = Chart.helpers.color;


window.onload = function() {
	var ctx = document.getElementById('myChart').getContext('2d');
	window.myChart = new Chart(ctx, config);
};

document.getElementById('randomizeData').addEventListener('click', function() {
	config.data.datasets.forEach(function(dataset) {
		dataset.data.forEach(function(dataObj) {
			dataObj.y = randomScalingFactor();
		});
	});
	window.myChart.update();
});

var colorNames = Object.keys(chartColors);
document.getElementById('addDataset').addEventListener('click', function() {
	var colorName = colorNames[config.data.datasets.length % colorNames.length];
	var newColor = chartColors[colorName];
	var newDataset = {
		label: 'Dataset ' + (config.data.datasets.length + 1),
		backgroundColor: color(newColor).alpha(0.5).rgbString(),
		borderColor: newColor,
		fill: false,
		lineTension: 0,
		data: []
	};

	config.data.datasets.push(newDataset);
	window.myChart.update();
});

document.getElementById('removeDataset').addEventListener('click', function() {
	config.data.datasets.pop();
	window.myChart.update();
});

document.getElementById('addData').addEventListener('click', function() {
	onRefresh(window.myChart);
	window.myChart.update();
});

*/