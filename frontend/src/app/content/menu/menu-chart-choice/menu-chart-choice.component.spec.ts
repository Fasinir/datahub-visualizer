import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChartChoiceComponent } from './menu-chart-choice.component';

describe('MenuChartChoiceComponent', () => {
  let component: MenuChartChoiceComponent;
  let fixture: ComponentFixture<MenuChartChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuChartChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuChartChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
