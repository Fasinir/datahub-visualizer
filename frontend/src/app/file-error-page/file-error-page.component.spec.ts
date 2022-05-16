import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileErrorPageComponent } from './file-error-page.component';

describe('FileErrorPageComponent', () => {
  let component: FileErrorPageComponent;
  let fixture: ComponentFixture<FileErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileErrorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
