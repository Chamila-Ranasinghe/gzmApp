import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationButtonsComponents } from './operation-buttons-components';

describe('OperationButtonsComponents', () => {
  let component: OperationButtonsComponents;
  let fixture: ComponentFixture<OperationButtonsComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationButtonsComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationButtonsComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
