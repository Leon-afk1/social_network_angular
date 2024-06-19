import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { ProfileComponent } from './profile/profile.component';
import { RecipeCardListComponent } from './recipe-card-list/recipe-card-list.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeComponent } from './recipe/recipe.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'profile', component: ProfileComponent },
  { path: 'recipe-form', component: RecipeFormComponent },
  { path: 'recipes', component: RecipeCardListComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
