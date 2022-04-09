import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ChartService } from '../services/chart.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private dataService: DataService, private chartService: ChartService) { }

  menuVisible: boolean = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    //sending config and getting data
    this.dataService.postConfigFile(null)
    .subscribe(
      _ => this.dataService.getChartsData()
      .subscribe(data => {this.chartService.notifyAboutLoadedData(data)}));
  }

  showMenuClick() {
    this.menuVisible = !this.menuVisible;
    this.change.emit(this.menuVisible);
  }
}
