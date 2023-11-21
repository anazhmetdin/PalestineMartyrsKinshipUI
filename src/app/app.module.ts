import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonalDataFormComponent } from './components/personal-data-form/personal-data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormAlertsComponent } from './components/form-alerts/form-alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonalDataFormComponent,
    FileUploadComponent,
    FormAlertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
