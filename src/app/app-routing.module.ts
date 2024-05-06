import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetitionListComponent } from './petition/petition-list/petition-list.component';
import { ImageListComponent } from './image/image-list/image-list.component';

const routes: Routes = [
  { path: 'petitions', component: PetitionListComponent },
  { path: 'images', component:ImageListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
