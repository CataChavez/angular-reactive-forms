import { group } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  namePattern: string = "([a-zA-Z]+) ([a-zA-Z]+)";
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  canNotBeStrider(control: FormControl): ValidationErrors | null {
    const val: string = control.value?.trim().toLowerCase();
    if (val === 'strider') {
      return {
        noStrider: true
      }

    }
    return null;
  };

  sameFields(field1: string, field2: string) {
    return (group: AbstractControl) : ValidationErrors | null  => {
      const pass = group.get(field1)?.value;
      const confirmPass = group.get(field2)?.value;

      if (pass !== confirmPass) {
        group.get(field2)?.setErrors({nonEquals: true});
        return { nonEquals: true }
      }
      group.get(field2)?.setErrors(null);
      return null;
    }
  }
}
