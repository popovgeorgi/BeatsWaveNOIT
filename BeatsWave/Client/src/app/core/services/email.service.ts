import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private commentPath = environment.apiUrl + '/emails';
  constructor(private http: HttpClient) { }

  sendEmail(data): Observable<any> {
    return this.http.post(this.commentPath, data);
  }
}
