import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetitionListComponent } from './petition/petition-list/petition-list.component';

const routes: Routes = [
  { path: 'petitions', component: PetitionListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
