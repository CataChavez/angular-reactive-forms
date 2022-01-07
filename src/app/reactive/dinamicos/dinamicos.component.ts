import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  myForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
      ]
    ],
    favorits: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],

    ])

  })

  newFavorit: FormControl = this.fb.control('', Validators.required);

  get favoritsArr() { 
    return this.myForm.get('favorits') as FormArray;
  }

  isValid(field: string) {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }
  addFavorit() { 

    if (this.newFavorit.invalid) {
      return;
    }
    this.favoritsArr.push(new FormControl(this.newFavorit.value, Validators.required));
    
    this.newFavorit.reset();

  }
  delete(i: number) {
    this.favoritsArr.removeAt(i);
  }

  onSave() {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      console.log(this.myForm.value);
      return
    }
  
  }


}
