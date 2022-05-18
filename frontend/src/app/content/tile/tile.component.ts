import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent {
  @Input() chartType: string = "placeholder";
  @Input() chartTitle: string = "Wykres";
}
