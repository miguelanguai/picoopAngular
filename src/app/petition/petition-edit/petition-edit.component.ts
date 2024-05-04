import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PetitionService } from '../petition.service';
import { Petition } from '../model/Petition';

@Component({
  selector: 'app-petition-edit',
  templateUrl: './petition-edit.component.html',
  styleUrls: ['./petition-edit.component.scss']
})
export class PetitionEditComponent implements OnInit{
  petition : Petition;
  currentDate: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<PetitionEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private petitionService: PetitionService
  ) { }

  ngOnInit(): void {
    if (this.data.petition != null) {
      this.petition = Object.assign({}, this.data.petition);
    }
    else {
      this.petition = new Petition();
    }
  }

  onSave() {
    this.petitionService.savePetition(this.petition).subscribe(result => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
