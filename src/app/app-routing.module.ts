import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalDataFormComponent } from './components/personal-data-form/personal-data-form.component';

const routes: Routes = [
  {path: "", component:PersonalDataFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
