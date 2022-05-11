import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() chartType: string = "placeholder";
  @Input() chartTitle: string = "Wykres";

  ngOnInit(): void {
  }

}
