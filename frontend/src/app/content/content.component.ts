import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ChartService} from '../services/chart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from "./modal/modal.component";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private chartService: ChartService, private modalService: NgbModal) {
  }

  chartData: any ={};

  notifierSubscription: Subscription = this.chartService.loadedData
    .subscribe(data => {
      this.chartData = data;
    });

  ngOnInit(): void {

  }

  openModal(data: any) {
    let chartLabels: string[] = data.chartData[0].xVals;
    let chartDatasets: {label: string, data: number[], type: string}[] = [];

    const modalRef = this.modalService.open(ModalComponent,
      {
        windowClass: 'chart_modal',
      });
    for (let set of data.chartData) {
      chartDatasets.push({label: set.label, data: set.yVals, type:set.type.toLowerCase( )})
    }
    console.log(chartDatasets)
    modalRef.componentInstance.chartDatasets = chartDatasets;
    modalRef.componentInstance.chartLabels = chartLabels;
  }

  chartType(type: string) {
    if (type === "LINE_BAR_CHART") {
      return "arrow";
    }
    return "scatter"
  }
}
