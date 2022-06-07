import { Component, Input, OnInit } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { Outlier } from '../chart/outliers.model';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent {
  @Input() chartType: string = "placeholder";
  @Input() chartTitle: string = "Wykres";
  @Input() colors: string[] = [];
  @Input() chart: any ={};
  normal: boolean = false;
  chartLabels: string[] = this.chart.xVals;
  chartDatasets: ChartDataset[] = [];
  outliers: Outlier[] = [];

  ngOnInit(): void {
    this.compute(this.chart);
  }
  
  compute(data: any) {
    console.log(data);
    this.chartLabels = data.xVals;

    for (let set of data.chartData) {
      this.chartDatasets.push({label: set.label, data: set.yVals, type: set.type.toLowerCase(), spanGaps: true})
      this.outliers.push({outlierLow: set.outlierLow, outlierHigh: set.outlierHigh})
    }
  }

}
