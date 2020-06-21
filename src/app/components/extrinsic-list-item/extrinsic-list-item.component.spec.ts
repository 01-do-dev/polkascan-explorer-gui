import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrinsicListItemComponent } from './extrinsic-list-item.component';

describe('ExtrinsicListItemComponent', () => {
  let component: ExtrinsicListItemComponent;
  let fixture: ComponentFixture<ExtrinsicListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtrinsicListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtrinsicListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
