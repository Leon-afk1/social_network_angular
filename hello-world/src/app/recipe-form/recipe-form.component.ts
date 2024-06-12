import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  myForm = new FormGroup({
    title: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
    difficulty: new FormControl('',Validators.required),
    nbPeople: new FormControl('',Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
  }

}
