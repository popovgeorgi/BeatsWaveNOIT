import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beat } from '../models/Beat';

@Injectable({
  providedIn: 'root'
})
export class BeatService {
  private beatPath = environment.apiUrl + '/beats';
  constructor(private http: HttpClient) { }

  uploadBeat(data) {
    return this.http.post(this.beatPath, data);
  }

  updateBeat(beatId: number, data) {
    return this.http.put(this.beatPath + '?beatId=' + beatId, data)
  }

  deleteBeat(beatId: number) {
    return this.http.delete(this.beatPath + '?beatId=' + beatId);
  }

  getBeats(takeCount, skipCount): Observable<Array<Beat>> {
    return this.http.get<Array<Beat>>(this.beatPath + '?take=' + takeCount + '&skip=' + skipCount);
  }

  getBeat(id): Observable<Beat> {
    return this.http.get<Beat>(this.beatPath + '/' + id);
  }

  getCurrentUserBeats(): Observable<Array<Beat>> {
    return this.http.get<Array<Beat>>(this.beatPath + '/mine');
  }

  getMostlyLikedBeats(): Observable<Array<Beat>> {
    return this.http.get<Array<Beat>>(this.beatPath + '/MostlyLiked');
  }

  getBeatsByGenre(genre: string, takeCount, skipCount): Observable<Array<Beat>> {
    return this.http.get<Array<Beat>>(this.beatPath + '/ByGenre' + '/' + genre + '?take=' + takeCount + '&skip=' + skipCount);
  }

  getBeatsByIds(ids: Array<number>): Observable<Array<Beat>> {
    let query = '';
    for (let i = 0; i < ids.length; i++) {
      if (i != ids.length - 1) {
        query += 'ids=' + ids[i] + '&';
      }
      else {
        query += 'ids=' + ids[i];
      }
    }
    return this.http.get<Array<Beat>>(this.beatPath + '/ByIds?' + query);
  }

  addPlay(beatId: number) {
    return this.http.post(this.beatPath + '/AddPlay', { 'beatId': beatId });
  }

  getTrending(): Observable<Array<Beat>> {
    return this.http.get<Array<Beat>>(this.beatPath + '/Trending');
  }

  getFeatured(): Observable<Array<Beat>> {
    return this.http.get<Array<Beat>>(this.beatPath + '/Featured');
  }

  getTotalCount(): Observable<number> {
    return this.http.get<number>(this.beatPath + '/TotalCount');
  }
}


