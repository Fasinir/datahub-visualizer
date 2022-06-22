import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFileButtonComponent } from './load-file-button.component';

describe('LoadFileButtonComponent', () => {
  let component: LoadFileButtonComponent;
  let fixture: ComponentFixture<LoadFileButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadFileButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFileButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
