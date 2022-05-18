import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  @Output() menuEmitter: EventEmitter<boolean> = new EventEmitter();

  showMenuClick() {
    this.menuEmitter.emit();
  }
}
