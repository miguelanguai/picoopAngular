import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitionEditComponent } from './petition-edit.component';

describe('PetitionEditComponent', () => {
  let component: PetitionEditComponent;
  let fixture: ComponentFixture<PetitionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetitionEditComponent]
    });
    fixture = TestBed.createComponent(PetitionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
