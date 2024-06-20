import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../classes/recipe';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isLoggedIn = false;
  suggestions: Recipe[] = [];
  sidebarVisible = false;

  constructor(private recipeService: RecipeService) {}

  @ViewChild('searchContainer') searchContainer!: ElementRef;
  @ViewChild('sidebar') sidebar!: ElementRef;

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.recipeService.searchRecipes(query).subscribe(data => {
      this.suggestions = data; 
    });
  }

  onSelectSuggestion(suggestion: string) {
    console.log('Suggestion selected:', suggestion);
    this.suggestions = [];
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (this.searchContainer && !this.searchContainer.nativeElement.contains(target)) {
      this.suggestions = [];
    }
    if (this.sidebarVisible && this.sidebar && !this.sidebar.nativeElement.contains(target) && !target.classList.contains('menu-icon')) {
      this.sidebarVisible = false;
    }
  }
}
