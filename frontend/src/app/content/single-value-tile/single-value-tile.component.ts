import { Component, OnInit } from '@angular/core';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-single-value-tile',
  templateUrl: './single-value-tile.component.html',
  styleUrls: ['./single-value-tile.component.css']
})
export class SingleValueTileComponent extends TileComponent {
  constructor() { super() }

}
