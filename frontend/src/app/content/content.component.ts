import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {ChartService} from '../services/chart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from "./modal/modal.component";
import {ChartDataset} from "chart.js";
import {Outlier} from "./chart/outliers.model";
import {MenuService} from "../services/menu.service";
import {MobileData} from "./mobile-data";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent {

  chartData: any = {};
  mobileData: MobileData = new MobileData();


  notifierSubscription: Subscription = this.chartService.loadedData
    .subscribe(data => {
      this.chartData = data;
    });

  menuSubscription: Subscription = this.menuService.clickedChartData
    .subscribe(data => {
      this.mobileData.isSingleValue = data.type === 'SINGLE_VALUE_CHART';
      if (this.mobileData.isSingleValue){
        this.mobileData.singleValue = data.value
        this.mobileData.name = data.label;
      }
      else this.displayChart(data, false);
    });

  constructor(private chartService: ChartService, private menuService: MenuService, private modalService: NgbModal) {
  }

  displayChart(data: any, forDesktop: boolean) {
    let chartLabels: string[] = data.xVals;
    let chartDatasets: ChartDataset[] = [];
    let outliers: Outlier[] = [];
    let colors: string[] = [];

    for (let set of data.chartData) {
      chartDatasets.push({label: set.label, data: set.yVals, type: set.type.toLowerCase(), spanGaps: true})
      outliers.push({outlierLow: set.outlierLow, outlierHigh: set.outlierHigh})

      if(set.hasOwnProperty('color')){
      colors.push(set.color)
      } else {
        colors.push("lightblue")
      }
    }
    this.mobileData.name = data.label;
    this.mobileData.labels = data.xVals;
    this.mobileData.outliers = outliers;
    this.mobileData.datasets = chartDatasets;
    this.mobileData.isSingleValue = false;
    this.mobileData.colors = colors;

    if (forDesktop) {
      const modalRef = this.modalService.open(ModalComponent, {
        windowClass: 'chart_modal',
      });
      modalRef.componentInstance.chartDatasets = chartDatasets;
      modalRef.componentInstance.chartLabels = chartLabels;
      modalRef.componentInstance.outliers = outliers;
      modalRef.componentInstance.colors = colors;
    }
  }

  chartType(type: string) {
    if (type === "LINE_BAR_CHART") {
      return "arrow";
    }
    return "scatter"
  }
}
