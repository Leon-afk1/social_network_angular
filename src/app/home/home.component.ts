import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';

import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  comments = [
    { text: '“Plus bon que bon”', user: { username: 'Philosophe68', description: 'J\'aime manger', avatar: 'assets/user1.jpg' } },
    { text: '“Quand c\'est bon, qu\'est ce que c\'est bon”', user: { username: 'Food lover', description: 'CAP Cuisine pas le BAC', avatar: 'assets/user2.jpg' } },
    { text: '“Plus que simplement bo, c\'était bon”', user: { username: 'Bg musclé 67', description: 'Cuisto chez Crous', avatar: 'assets/user3.jpg' } }
  ];

  categories: string[] = [];

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.recipeService.getTopCategories(4).subscribe(categories => {
      this.categories = categories;
    });
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/recipes'], { queryParams: { category: category } });
  }

}
