import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadConfigPageComponent } from './load-config-page.component';

describe('LoadConfigPageComponent', () => {
  let component: LoadConfigPageComponent;
  let fixture: ComponentFixture<LoadConfigPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadConfigPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadConfigPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
