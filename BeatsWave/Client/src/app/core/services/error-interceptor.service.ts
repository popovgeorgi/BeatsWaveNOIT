import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { SimpleModalService } from 'ngx-simple-modal';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(private snotifyService: SnotifyService,
    private router: Router,
    private simpleModalService: SimpleModalService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url == environment.apiUrl + "/identity/login" && request.method == "POST") {
      return next.handle(request);
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
          this.router.navigate(["/404"]);
        }
        if (message) {
          this.snotifyService.error(message);
        }
        return throwError(err);
      })
    )
  }
}
