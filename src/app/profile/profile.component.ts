import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../classes/user'; 
import { AuthService } from '../auth.service';
import { RecipeService } from '../recipe.service';
import { Recipe} from '../../classes/recipe'
import { ImageUploadComponent } from '../image-upload/image-upload.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imageURL : String;
  user: User = {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    description: '',
    avatar: ''
  };
  isEditing: boolean = false;
  isOwner: boolean = false;
  recipes: Recipe[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthService,private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.authService.getUserById(userId).subscribe(
        user => {
          this.user = user;
          this.isOwner = this.authService.getUserId() === user.id; // Check if the logged-in user is the profile owner
          this.loadUserRecipes(user.id); // Fetch user's recipes

        },
        error => {
          console.error('Error fetching user:', error);
          // Handle the error case, e.g., redirect to an error page or show a message
        }
      );
    });
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.saveChanges();
    }
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    if (this.user) {
      this.authService.updateUser(this.user).subscribe(
        updatedUser => {
          console.log('Profile updated:', updatedUser);
          this.user = updatedUser;
          this.isEditing = false; // Exit edit mode after saving changes
        },
        error => {
          console.error('Error updating profile:', error);
          // Handle the error case, e.g., show an error message
        }
      );
    }
  }


  handleImageOutput(imageURL: string) {
    if (this.user) {
      this.user.avatar = imageURL;
    } else {
      console.error('User object is null.'); // Handle the case where user is null
    }
  }

  loadUserRecipes(userId: String): void {
    this.recipeService.getRecipesByUser(userId).subscribe(
      recipes => {
        this.recipes = recipes;
      },
      error => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

}
