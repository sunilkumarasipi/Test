import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPagingComponent } from './common-paging.component';

describe('CommonPagingComponent', () => {
  let component: CommonPagingComponent;
  let fixture: ComponentFixture<CommonPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
