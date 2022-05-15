import {Component, Input, OnChanges} from '@angular/core';
import {ChartOptions, ChartType, ChartDataset} from 'chart.js';

@Component({
  selector: 'app-chart', templateUrl: './chart.component.html', styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {


  chartType: ChartType = "line";
  @Input() chartDatasets: ChartDataset[] = [];
  @Input() labels: string[] = [];
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

  constructor() {
  }

  ngOnChanges(): void {
    for (let item of this.chartDatasets) {
      if (item.type == "bar"){
        const color = this.getRandomColor();
        item.backgroundColor = item.data.map((v) => (v == null || (v >= 7 && v <= 23 ) ? color : "red"));
        item.hoverBackgroundColor = item.backgroundColor;
      }
    else if (item.type == "line"){
        const color = this.getRandomColor();
        item.pointBackgroundColor = item.data.map((v) => (v == null || (v >= 7 && v <= 23 ) ? color : "red"));
      }
    }
    console.log(this.chartDatasets)
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
