import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Beat } from '../models/Beat';

@Injectable({
  providedIn: 'root'
})
export class RecommendService {
  private recommendPath = environment.apiUrl + '/recommends';
  constructor(private http: HttpClient) { }

  getRecommended(): Observable<Array<Beat>> {
    return this.http.get<Array<Beat>>(this.recommendPath);
  }
}
