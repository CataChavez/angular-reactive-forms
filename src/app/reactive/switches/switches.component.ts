import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  constructor(
    private fb: FormBuilder,

  ) { }

  myForm = this.fb.group({
    gender: ['', Validators.required],
    notifications: [true, Validators.required],
    terms: [ false, Validators.requiredTrue]
  })

  person = {
    gender: 'M',
    notifications: true,
  }

  ngOnInit(): void {
    this.fillForm()
/*     this.myForm.get('terms')?.valueChanges.subscribe(value => { 
      console.log(value)
    })

    this.myForm.valueChanges.subscribe(form => {
      console.log(form)
    }) */
    this.myForm.valueChanges.subscribe(({terms, ...rest}) => {
      this.person = rest
    })


  }

  fillForm() {
    this.myForm.reset({
      ...this.person,
      conditions: false
    } )
  }

  save() {
    const formValue = { ...this.myForm.value }
    delete formValue.terms
    console.log(formValue)
  }


}
