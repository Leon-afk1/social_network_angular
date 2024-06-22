import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../classes/recipe';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((data: Recipe[]) => {
      this.recipes = data.slice(0, 3).map((recipe, index) => {
        return {
          ...recipe
        };
      });

      const carouselElement = document.getElementById('carouselExampleCaptions');
      if (carouselElement) {
        carouselElement.addEventListener('slide.bs.carousel', (event: any) => {
          const activeIndex = event.to;
          this.updateActiveCaption(activeIndex);
        });
      }
    });
  }

  updateActiveCaption(activeIndex: number) {
    const captions = document.querySelectorAll('.carousel-caption-item');
    captions.forEach((caption, index) => {
      if (index === activeIndex) {
        caption.classList.add('active');
      } else {
        caption.classList.remove('active');
      }
    });
  }
}
