import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.vS.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vS.emailPattern)], [this.emailVal]],
    userName: ['', [Validators.required, this.vS.canNotBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)] ],
    confirmPassword: ['', [Validators.required,]],
  }, {
    validators: [ this.vS.sameFields('password', 'confirmPassword') ]
  }
  )

  constructor(
    private fb: FormBuilder,
    private vS: ValidatorsService,
    private emailVal: EmailValidatorService

    ) { }

  ngOnInit(): void {

    this.myForm.reset({
      name: 'catherine chavez',
      email: 'test1@test.com',
      userName: 'katasss',
      password: '123456',
      confirmPassword: '123456',
    })
  }

  get emailErrorsMessage(): string {
    const errors = this.myForm.get('email')?.errors;

      if (errors?.required) {
        return 'Email is required';
      }
      if (errors?.pattern) {
        return 'Email is not valid';
      }
      else if (errors?.emailExists) {
        return 'Email already exists';
      }
       return '';

  }

  noValidField(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  onSubmit() { 
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }



}
