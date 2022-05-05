import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor() {
  }

  menuVisible: boolean = false;

  @Output() menuEmitter: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    //sending config and getting data

  }

  showMenuClick() {
    this.menuVisible = !this.menuVisible;
    this.menuEmitter.emit(this.menuVisible);
  }
}
