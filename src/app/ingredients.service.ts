import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Ingredient } from '../classes/ingredient';
import { IngredientImage } from '../classes/ingredientImage';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private unsplashApiUrl = 'https://api.unsplash.com/search/photos?page=1';
  private unsplashClientId = 'q8K0gPmBuerjXPYjX6i2SWwQoFDDr4dE9F227Omd4ts';
  private ingredientApiUrl = "http://localhost:3000/ingredients";

  constructor(private http: HttpClient) { }

  public async getIngredientImage(ingredientName: string): Promise<string> {
    ingredientName = ingredientName.toLowerCase();
    let ingredientFetched: IngredientImage[] | undefined;
    let ingredient: IngredientImage | undefined;
    ingredientFetched = await this.ingredientExists(ingredientName);
    if(ingredientFetched == undefined || ingredientFetched.length == 0){
      ingredient= undefined;
    }else{
      ingredient = ingredientFetched[0];
    }

    console.log("ingredient fertched: ",ingredient);
    if(ingredient){
      console.log("exists");
      return ingredient.imageURL;
    }else{
      let imageURL:string="assets/default-ingredient.png";
      this.fetchImageFromUnsplash(ingredientName).subscribe(
        data => {
          console.log(data);
          let url = data.results[0].links.download;
          this.saveImage(url, ingredientName);
          imageURL = url;
        },
        error => {
          console.error('Error fetching image from Unsplash:', error);
          this.saveImage(imageURL, ingredientName);
        }
      )
      return imageURL;
    }
  }  

  async ingredientExists(ingredientName: string): Promise<IngredientImage[] | undefined> {
    return this.http.get<IngredientImage[]>(`${this.ingredientApiUrl}?name=${ingredientName}`).toPromise();
  }

  fetchImageFromUnsplash(ingredientName: string): Observable<any> {
    const url = `${this.unsplashApiUrl}&query=${ingredientName}&lang=fr&rel=first&client_id=${this.unsplashClientId}`;;
    return this.http.get<any>(url);
  }

  saveImage(imageURL:string, imageName:string){
    let ingredient: IngredientImage = new IngredientImage(imageName,imageURL);
    ingredient.id = uuidv4();
    this.http.post<IngredientImage>(this.ingredientApiUrl, ingredient).subscribe(
      data => {
        console.log('Ingredient saved:', data);
      },
      error => {
        console.error('Error saving ingredient:', error);
      }
    );
  }
}

