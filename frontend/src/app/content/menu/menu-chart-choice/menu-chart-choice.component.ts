import {Component, Input} from '@angular/core';
import {MenuService} from "../../../services/menu.service";

@Component({
  selector: 'app-menu-chart-choice',
  templateUrl: './menu-chart-choice.component.html',
  styleUrls: ['./menu-chart-choice.component.css']
})
export class MenuChartChoiceComponent {
  @Input() chartTitle: string = "";
  @Input() chartData: any;

  constructor(private menuService: MenuService) {
  }

  clicked() {
    this.menuService.notifyAboutClick(this.chartData)
  }
}
