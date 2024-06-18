import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardListComponent } from './recipe-card-list.component';

describe('RecipeCardListComponent', () => {
  let component: RecipeCardListComponent;
  let fixture: ComponentFixture<RecipeCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
