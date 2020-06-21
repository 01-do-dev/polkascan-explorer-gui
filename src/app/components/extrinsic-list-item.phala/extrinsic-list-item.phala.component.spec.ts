import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Phala__ExtrinsicListItemComponent } from './extrinsic-list-item.phala.component';

describe('Phala__ExtrinsicListItemComponent', () => {
  let component: Phala__ExtrinsicListItemComponent;
  let fixture: ComponentFixture<Phala__ExtrinsicListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phala__ExtrinsicListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phala__ExtrinsicListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
