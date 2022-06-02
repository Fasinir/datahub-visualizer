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
  @Input() colors: string[] = [];
  chartOptions: ChartOptions = {
    responsive: true, maintainAspectRatio: false, color: 'black', scales: {
      x: {
        reverse: true,
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

  ngOnChanges(): void {
    for (let _i = 0; _i < this.chartDatasets.length; _i++) {
      let dataset = this.chartDatasets[_i];
      let outlier = this.outliers[_i];
      let color = this.colors[_i];
      this.datasetManipulation(dataset, outlier, color)
    }
  }

  datasetManipulation(dataset: ChartDataset, outlier: Outlier, color: string) {
    if (dataset.type == "bar") {
      dataset.backgroundColor = this.getColors(dataset, outlier, color)
      dataset.hoverBackgroundColor = dataset.backgroundColor;
    } else if (dataset.type == "line") {
      dataset.pointBackgroundColor = this.getColors(dataset, outlier, color)
      dataset.pointRadius = 4
    }
  }

  getColors(dataset: ChartDataset, outlier: Outlier, color: string) {
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
