import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {
  
  constructor(
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.myForm.setValue({
      name: '',
      price: '',
      existence: '',
    })
  }

  myForm: FormGroup = this.fb.group({
    name: [
      ,
      [
        Validators.required,
        Validators.minLength(3),
      ]
    ],
    price: [
      ,
      [
        Validators.required,
        Validators.min(0),
      ]
    ],
    existence: [
      ,
      [
        Validators.required,
        Validators.min(0),
      ]
    ],
  })

  isValid(field: string){
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  onSubmit() { 
    if (this.myForm.invalid) { 
      this.myForm.markAllAsTouched();
      return
    }
    this.myForm.reset();
    console.log(this.myForm.value);
  }

}
