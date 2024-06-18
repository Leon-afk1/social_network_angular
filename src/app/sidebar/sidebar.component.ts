import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isLoggedIn = false;
  suggestions: string[] = [];
  sidebarVisible = false;

  @ViewChild('searchContainer') searchContainer!: ElementRef;
  @ViewChild('sidebar') sidebar!: ElementRef;

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.suggestions = this.getSuggestions(query);
  }

  getSuggestions(query: string): string[] {
    const allRecipes = ['Recette 1', 'Recette 2', 'Recette 3', 'Recette 4', 'Recette 5'];
    return allRecipes.filter(recipe => recipe.toLowerCase().includes(query));
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
