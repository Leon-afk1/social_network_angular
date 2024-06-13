import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm = new FormGroup({
    title: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
    difficulty: new FormControl('',Validators.required),
    nbPeople: new FormControl('',Validators.required),
    duration: new FormControl('',Validators.required),
    instructions: new FormArray([
      new FormControl('',Validators.required)
    ]),
    ingredients: new FormArray([
      new FormGroup({
        name: new FormControl('',Validators.required),
        quantity: new FormControl('',Validators.required),
        unit: new FormControl('',Validators.required)
      })
    ])
  })

  constructor() { }

  ngOnInit(): void {
  }
  onFormSubmit(){
    console.log(this.recipeForm.value);
  }
}
