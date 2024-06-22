// profile.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../classes/user'; // Assuming User class is defined correctly

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null; // Initialize as null or undefined

  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];

      this.http.get<User>(`http://localhost:3000/users/${userId}`).subscribe(
        user => {
          this.user = user;
        },
        error => {
          console.error('Error fetching user:', error);
          this.user = null; // Handle error condition
        }
      );
    });
  }
}
