import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private fileUploadPath = environment.apiUrl + '/FileUpload'
  constructor(private http: HttpClient) { }

  uploadProfilePicture(file) {
    return this.http.post(this.fileUploadPath + '/SaveProfilePhoto', file);
  }
}
