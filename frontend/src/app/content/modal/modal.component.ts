import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ChartDataset} from "chart.js";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() chartLabels: string[] = [];
  @Input() chartDatasets: ChartDataset[] = [];

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {

  }
}
