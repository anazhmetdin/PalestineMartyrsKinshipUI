import { Component, Input } from '@angular/core';
import { FormStates } from 'src/app/Enums/form-states';

@Component({
  selector: 'app-form-alerts',
  templateUrl: './form-alerts.component.html',
})
export class FormAlertsComponent {
  @Input()
  state!: string;
  @Input()
  alert!: string;

  public get FormStates(): typeof FormStates {
    return FormStates;
  }
}
