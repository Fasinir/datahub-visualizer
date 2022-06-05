import {Component} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {MenuService} from "./services/menu.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  menuVisible: boolean = false;

  menuSubscription: Subscription = this.menuService.clickedChartData
    .subscribe(_data => {
      this.menuVisible = false;
    });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private menuService: MenuService
  ) {
    // detect screen size changes
    this.breakpointObserver.observe([
      "(min-width: 768px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.menuVisible = false;
      } else {
        // show stuff
      }
    });
  }

  onMenuChange() {
    this.menuVisible = !this.menuVisible;
  }
}
