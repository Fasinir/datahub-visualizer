import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleValueTileComponent } from './single-value-tile.component';

describe('SingleValueTileComponent', () => {
  let component: SingleValueTileComponent;
  let fixture: ComponentFixture<SingleValueTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleValueTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleValueTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
