import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private chartService: ChartService) { }

  chartData: any= {} as any;

  notifierSubscription: Subscription = this.chartService.loadedData
    .subscribe(data => {this.chartData = data; console.log(this.chartData.labels)});

  ngOnInit(): void {
    
  }

}
