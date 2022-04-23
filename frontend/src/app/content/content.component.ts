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

  chartLabels: string[] = [];
  chartDatasets: any;

  notifierSubscription: Subscription = this.chartService.loadedData
    .subscribe(data => {
      this.chartLabels = data.labels;
      this.chartDatasets = data.datasets;
    });

  ngOnInit(): void {

  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent,
      {
        windowClass: 'chart_modal',
      });

    modalRef.componentInstance.chartDatasets = this.chartDatasets;
    modalRef.componentInstance.chartLabels = this.chartLabels;
  }
}
