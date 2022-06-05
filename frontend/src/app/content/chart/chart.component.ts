import {Component, Input, OnChanges} from '@angular/core';
import {ChartOptions, ChartType, ChartDataset} from 'chart.js';
import {Outlier} from "./outliers.model";

@Component({
  selector: 'app-chart', templateUrl: './chart.component.html', styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {


  chartType: ChartType = "line";
  @Input() chartDatasets: ChartDataset[] = [];
  @Input() outliers: Outlier[] = [];
  @Input() labels: string[] = [];
  @Input() normal: boolean = true;
  chartOptions: ChartOptions = {};

  ngOnChanges(): void {
    this.chartOptions = {
      plugins:{
          legend:{
            display:this.normal
          },
     
      },
      responsive: true, maintainAspectRatio: false, color: 'black', scales: {
        x: {
          display:this.normal,
          ticks: {
            color: 'black',
          }
        }, y: {
        
          ticks: {
            color: 'black',
          }
        }
      }
  
    };
    console.log(this.chartOptions)
    for (let _i = 0; _i < this.chartDatasets.length; _i++) {
      let dataset = this.chartDatasets[_i];
      let outlier = this.outliers[_i];
      this.datasetManipulation(dataset, outlier)
    }
  }

  datasetManipulation(dataset: ChartDataset, outlier: Outlier) {
    if (dataset.type == "bar") {
      dataset.backgroundColor = this.getColors(dataset, outlier)
      dataset.hoverBackgroundColor = dataset.backgroundColor;
    } else if (dataset.type == "line") {
      dataset.pointBackgroundColor = this.getColors(dataset, outlier)
      dataset.pointRadius = 4
    }
  }

  getColors(dataset: ChartDataset, outlier: Outlier) {
    const color = this.getRandomColor();
    return dataset.data.map((v) => (v == null || ((outlier.outlierLow == null || v >= outlier.outlierLow)
      && (outlier.outlierHigh == null || v <= outlier.outlierHigh)) ? color : "red"));
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#'; // <-----------
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
