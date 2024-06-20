import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeCardListComponent } from './recipe-card-list/recipe-card-list.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { CarouselComponent } from './carousel/carousel.component';
import { RecipeReviewsComponent } from './recipe-reviews/recipe-reviews.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';



@NgModule({
  declarations: [
    AppComponent,
    RecipeFormComponent,
    RecipeComponent,
    RecipeCardComponent,
    RecipeCardListComponent,
    HomeComponent,
    SidebarComponent,
    CarouselComponent,
    AddReviewComponent,
    RecipeReviewsComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})

export class AppModule { }
