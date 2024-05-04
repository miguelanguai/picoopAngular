import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitionListComponent } from './petition-list.component';

describe('PetitionListComponent', () => {
  let component: PetitionListComponent;
  let fixture: ComponentFixture<PetitionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetitionListComponent]
    });
    fixture = TestBed.createComponent(PetitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
