<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartService } from '../services/chart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from "./modal/modal.component";
=======
import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {ChartService} from '../services/chart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from "./modal/modal.component";
import {ChartDataset} from "chart.js";
import {Outlier} from "./chart/outliers.model";
>>>>>>> a8b145bd01ced5e440af8a8ec67abee8bc751a4d

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent {

  constructor(private chartService: ChartService, private modalService: NgbModal) {
  }

  chartData: any = {};

  notifierSubscription: Subscription = this.chartService.loadedData
    .subscribe(data => {
      this.chartData = data;
    });

  openModal(data: any) {
    let chartLabels: string[] = data.xVals;
    let chartDatasets: ChartDataset[] = [];
    let outliers: Outlier[] = [];

    const modalRef = this.modalService.open(ModalComponent,
      {
        windowClass: 'chart_modal',
      });
    for (let set of data.chartData) {
      chartDatasets.push({label: set.label, data: set.yVals, type: set.type.toLowerCase()})
      outliers.push({outlierLow: set.outlierLow, outlierHigh: set.outlierHigh})
    }
    modalRef.componentInstance.chartDatasets = chartDatasets;
    modalRef.componentInstance.chartLabels = chartLabels;
    modalRef.componentInstance.outliers = outliers;
  }

  chartType(type
              :
              string
  ) {
    if (type === "LINE_BAR_CHART") {
      return "arrow";
    }
    return "scatter"
  }
}
