import {Component, Input, OnChanges} from '@angular/core';
import {ChartOptions} from 'chart.js';

@Component({
  selector: 'app-chart', templateUrl: './chart.component.html', styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {


  chartType = 'line';
  @Input() chartDataset: number[][] = [];
  @Input() labels: string[] = [];
  chartDatasets: { data: number[], label: string }[] = [];
  chartOptions: ChartOptions = {
    responsive: true, color: 'black', scales: {
      x: {
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
    console.log(this.chartDataset);
    this.mapData();

  }

  chartClicked(event: any) {

  }

  chartHovered(event: any) {

  }

  mapData() {
    if (this.chartDataset) {
      for (let [key, value] of Object.entries(this.chartDataset)) {
        this.chartDatasets.push({data: value, label: key});
      }
    }
  }
}
