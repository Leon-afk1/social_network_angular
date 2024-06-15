import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeCardListComponent } from './recipe-card-list/recipe-card-list.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipeFormComponent,
    RecipeComponent,
    RecipeCardComponent,
    RecipeCardListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
