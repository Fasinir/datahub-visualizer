import { Component, Input, OnInit } from '@angular/core';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-single-value-tile',
  templateUrl: './single-value-tile.component.html',
  styleUrls: ['./single-value-tile.component.css']
})
export class SingleValueTileComponent implements OnInit {
  constructor() { }

  @Input() chartTitle: string = "Wykres";
  @Input() chartValue: any = 0;
  ngOnInit(): void {
  }

}
