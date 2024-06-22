import { Review } from '../classes/review';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = 'http://localhost:3000/reviews';  
  constructor(private http: HttpClient) { }

  getReviews(recipeId: string): Observable<Review[]> {
    const url = `${this.reviewsUrl}?recipeId=${recipeId}`;
    return this.http.get<Review[]>(url);
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.reviewsUrl, review, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteReview(id: string): Observable<{}> {
    const url = `${this.reviewsUrl}/${id}`;
    return this.http.delete(url);
  }
}
