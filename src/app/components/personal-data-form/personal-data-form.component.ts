import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalDataService } from 'src/app/Services/romanizer.service';
import { UploadPeopleDataService } from 'src/app/Services/upload-people-data.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
})
export class PersonalDataFormComponent {
  localeID: string

  constructor(@Inject(LOCALE_ID) locale: string,
    readonly fileuploader: UploadPeopleDataService,
    private readonly PersonalData: PersonalDataService,
    private router: Router,)
  {
    this.localeID = locale;
  }

  bioSection = new FormGroup({
    Name: new FormControl(''),
  });

  callingFunction() {
    if (this.bioSection.controls.Name.value)
      this.PersonalData.GetNameRomanized(this.bioSection.controls.Name.value)
        .subscribe({
          next: (data) => {
            this.localeID = data.toString()
          },
          error: () => {
            this.router.navigate([]);
          }
        })
  }
}
