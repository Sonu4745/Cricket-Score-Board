import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCountComponent } from './bill-count.component';

describe('BillCountComponent', () => {
  let component: BillCountComponent;
  let fixture: ComponentFixture<BillCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
