import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetitionListComponent } from './petition/petition-list/petition-list.component';
import { ImageListComponent } from './image/image-list/image-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ImageUploadComponent } from './image/image-upload/image-upload.component';

const routes: Routes = [
  { path: 'public/petitions', component: PetitionListComponent },
  { path: 'public/images', component:ImageListComponent},
  { path: 'auth/signin', component:LoginComponent},
  { path: 'auth/signup', component:RegisterComponent},
  { path: 'user/image', component:ImageUploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
