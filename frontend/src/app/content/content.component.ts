import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {ChartService} from '../services/chart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from "./modal/modal.component";
import {ChartDataset} from "chart.js";
import {Outlier} from "./chart/outliers.model";
import {MenuService} from "../services/menu.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent {

  chartData: any = {};
  mobileName: string = "";
  mobileLabels: string[] = [];
  mobileDatasets: ChartDataset[] = [];
  mobileOutliers: Outlier[] = []
  notifierSubscription: Subscription = this.chartService.loadedData
    .subscribe(data => {
      this.chartData = data;
    });

  menuSubscription: Subscription = this.menuService.clickedChartData
    .subscribe(data => {
      this.displayChart(data, false);
    });

  constructor(private chartService: ChartService, private menuService: MenuService, private modalService: NgbModal) {
  }

  displayChart(data: any, forDesktop: boolean) {
    let chartLabels: string[] = data.xVals;
    let chartDatasets: ChartDataset[] = [];
    let outliers: Outlier[] = [];

    for (let set of data.chartData) {
      chartDatasets.push({label: set.label, data: set.yVals, type: set.type.toLowerCase(), spanGaps: true})
      outliers.push({outlierLow: set.outlierLow, outlierHigh: set.outlierHigh})
    }
    this.mobileName = data.label;
    this.mobileLabels = data.xVals;
    this.mobileOutliers = outliers;
    this.mobileDatasets = chartDatasets;

    if (forDesktop) {
      const modalRef = this.modalService.open(ModalComponent, {
        windowClass: 'chart_modal',
      });
      modalRef.componentInstance.chartDatasets = chartDatasets;
      modalRef.componentInstance.chartLabels = chartLabels;
      modalRef.componentInstance.outliers = outliers;
    }
  }

  chartType(type: string) {
    if (type === "LINE_BAR_CHART") {
      return "arrow";
    }
    return "scatter"
  }
}
