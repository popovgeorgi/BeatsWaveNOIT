import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(private snotifyService: SnotifyService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url == "https://localhost:5001/identity/login" && request.method == "POST") {
      return;
    }
    return next.handle(request).pipe(
      retry(1),
      catchError((err) => {
        let message = '';
        if (err.status === 401) {
          message = "You should be logged in!";
        }
        else if (err.status === 404) {
          message = "404";
        }
        if (message) {
          this.snotifyService.error(message);
        }
        return throwError(err);
      })
    )
  }
}
