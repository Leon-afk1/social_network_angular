import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../classes/user'; // Import User class
import { AuthService } from '../auth.service';
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

  constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.authService.getUserById(userId).subscribe(
        user => {
          this.user = user;
          this.isOwner = this.authService.getUserId() === user.id; // Check if the logged-in user is the profile owner
        },
        error => {
          console.error('Error fetching user:', error);
          // Handle the error case, e.g., redirect to an error page or show a message
        }
      );
    });
    console.log(this.user)
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.saveChanges();
    }
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    if (this.user) {
      this.http.put<User>(`http://localhost:3000/users/${this.user.id}`, this.user).subscribe(
        user => {
          console.log('Profile updated', user);
          this.user = user;
        },
        error => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }
  handleImageOutput(imageURL: string) {
    this.imageURL = imageURL;
    console.log(this.imageURL);
  }

}
