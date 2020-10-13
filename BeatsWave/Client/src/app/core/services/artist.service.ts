import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/Artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private artistPath = environment.apiUrl + '/artists';
  constructor(private http: HttpClient) { }

  getArtists(): Observable<Array<Artist>> {
    return this.http.get<Array<Artist>>(this.artistPath);
  }
}
