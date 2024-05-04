import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Petition } from '../model/Petition';
import { PetitionService } from '../petition.service';
import { MatDialog } from '@angular/material/dialog';
import { PetitionEditComponent } from '../petition-edit/petition-edit.component';

@Component({
  selector: 'app-petition-list',
  templateUrl: './petition-list.component.html',
  styleUrls: ['./petition-list.component.scss']
})
export class PetitionListComponent implements OnInit{


  dataSource = new MatTableDataSource<Petition>();
  displayedColumns: string[] = ['petitionId', 'petitionTitle', 'petitionDescription', 'petitionDate'];

  constructor(
    private petitionService: PetitionService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.petitionService.getPetitions().subscribe(
      petitions => this.dataSource.data = petitions
    );
  }
  createPetition() {
    const dialogRef = this.dialog.open(PetitionEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
