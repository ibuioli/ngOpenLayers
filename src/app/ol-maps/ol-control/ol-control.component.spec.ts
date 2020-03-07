import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlControlComponent } from './ol-control.component';

describe('OlControlComponent', () => {
  let component: OlControlComponent;
  let fixture: ComponentFixture<OlControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
