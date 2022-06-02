import {Component, Input} from '@angular/core';
import {ChartDataset} from "chart.js";
import {Outlier} from "../chart/outliers.model";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() chartLabels: string[] = [];
  @Input() chartDatasets: ChartDataset[] = [];
  @Input() outliers: Outlier[] = [];
  @Input() colors: string[] = [];
}
