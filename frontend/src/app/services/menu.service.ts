import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  clickedChartData: Subject<any> = new Subject<any>();

  notifyAboutClick(clickedChartData: any){
    this.clickedChartData.next(clickedChartData);
  }
}
