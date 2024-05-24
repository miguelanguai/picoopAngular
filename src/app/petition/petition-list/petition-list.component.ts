import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Petition } from '../model/Petition';
import { PetitionService } from '../petition.service';
import { MatDialog } from '@angular/material/dialog';
import { PetitionEditComponent } from '../petition-edit/petition-edit.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { PetitionHasImage } from '../model/PetitionHasImage';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-petition-list',
  templateUrl: './petition-list.component.html',
  styleUrls: ['./petition-list.component.scss']
})
export class PetitionListComponent implements OnInit {


  dataSource = new MatTableDataSource<PetitionHasImage>();
  displayedColumns: string[] = ['petitionTitle', 'petitionDescription', 'petitionDate', 'hasImage', 'action'];
  petition: Petition;
  petitionHasImage: PetitionHasImage;

  constructor(
    private petitionService: PetitionService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
  ) {
    this.dataSource = new MatTableDataSource<PetitionHasImage>();
  }

  ngOnInit(): void {
    this.petitionService.getPetitions().subscribe(petitions => {
      const petitionsWithImages$ = petitions.map(petition =>
        this.petitionService.hasImages(petition.petitionId).pipe(
          map(hasImages => ({ petition, hasImages }))
        )
      );

      forkJoin(petitionsWithImages$).subscribe(petitionsWithImages => {
        this.dataSource.data = petitionsWithImages;
      });
    });
  }
  createPetition() {
    if (this.authService.isAuthenticated()) {

      const dialogRef = this.dialog.open(PetitionEditComponent, {
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    } else {
      this.router.navigate(['/auth/signin']);
    }
  }
  navigateToUploadImage(petitionPassing: PetitionHasImage): void {
    if (this.authService.isAuthenticated()) {
      localStorage.setItem('currentPetition', JSON.stringify(petitionPassing.petition));
      this.router.navigate(['/user/image']);
    } else {
      this.router.navigate(['/auth/signin']);
    }
  }

  hasImages(petitionId: number): boolean {
    let hasImages: boolean = false;
    this.petitionService.hasImages(petitionId).subscribe((result: boolean) => {
      console.log("holamundo");

      hasImages = result;
    });
    return hasImages;
  }
}
