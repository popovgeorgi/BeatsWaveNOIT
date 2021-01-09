import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BeatAnalytics } from '../models/analytics/BeatAnalytics';
import { PurchasesAnalytics } from '../models/analytics/PurchasesAnalytics';
import { UserAnalytics } from '../models/analytics/UserAnalytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private analyticsPath = environment.apiUrl + '/analytics';
  constructor(private http: HttpClient) { }

  getUsersPerMonth(): Observable<UserAnalytics> {
    return this.http.get<UserAnalytics>(this.analyticsPath + '/UsersCountByMonths');
  }

  getBeatsPerMonth(): Observable<BeatAnalytics> {
    return this.http.get<BeatAnalytics>(this.analyticsPath + '/BeatsCountByMonths');
  }

  getPurchasesPerMonth(): Observable<PurchasesAnalytics> {
    return this.http.get<PurchasesAnalytics>(this.analyticsPath + '/PurchasesByMonths');
  }
}
