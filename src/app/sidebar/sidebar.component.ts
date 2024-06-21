import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../classes/recipe';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isLoggedIn = false;
  suggestions: Recipe[] = [];
  sidebarVisible = false;
  showSignIn = false;
  showLogin = false;

  constructor(private recipeService: RecipeService, public authService : AuthService, private router: Router) {}
  
  @ViewChild('searchContainer') searchContainer!: ElementRef;
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('signIn') signIn!: ElementRef;
  @ViewChild('login') login!: ElementRef;

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
    if (this.showSignIn && this.signIn && !this.signIn.nativeElement.contains(target)) {
      this.showSignIn = false;
    }
    if (this.showLogin && this.login && !this.login.nativeElement.contains(target)) {
      this.showLogin = false;
    }
  }

  toggleSignIn() {
    this.showSignIn = !this.showSignIn;
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

  closeSignIn() {
    this.showSignIn = false;
  }

  closeLogin() {
    this.showLogin = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
