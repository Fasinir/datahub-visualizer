import {Component} from '@angular/core';
import {ChartService} from "../../services/chart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private chartService: ChartService) {
  }

  chartData: any = {};

  notifierSubscription: Subscription = this.chartService.loadedData
    .subscribe(data => {
      this.chartData = data;
    });
}
