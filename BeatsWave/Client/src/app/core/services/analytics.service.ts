import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BeatAnalytics } from '../models/analytics/BeatAnalytics';
import { CountryAnalytics } from '../models/analytics/CountryAnalytics';
import { LikeAnalytics } from '../models/analytics/LikeAnalytics';
import { PurchasesAnalytics } from '../models/analytics/PurchasesAnalytics';
import { TotalEarningsAnalytics } from '../models/analytics/TotalEarningsAnalytics';
import { UserAnalytics } from '../models/analytics/UserAnalytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private analyticsPath = environment.apiUrl + '/analytics';
  constructor(private http: HttpClient) { }

  //methods that are related to the whole application

  getUsersPerMonth(): Observable<UserAnalytics> {
    return this.http.get<UserAnalytics>(this.analyticsPath + '/UsersCountByMonths');
  }

  getBeatsPerMonth(): Observable<BeatAnalytics> {
    return this.http.get<BeatAnalytics>(this.analyticsPath + '/BeatsCountByMonths');
  }

  getPurchasesPerMonth(): Observable<PurchasesAnalytics> {
    return this.http.get<PurchasesAnalytics>(this.analyticsPath + '/PurchasesByMonths');
  }

  getTotalEarnings(): Observable<TotalEarningsAnalytics> {
    return this.http.get<TotalEarningsAnalytics>(this.analyticsPath + '/TotalEarnings')
  }

  //methods that are related to the producer's music

  getDistinctUsers(): Observable<UserAnalytics> {
    return this.http.get<UserAnalytics>(this.analyticsPath + '/DistinctUsers');
  }

  getUserBeatsPerMonth(): Observable<BeatAnalytics> {
    return this.http.get<BeatAnalytics>(this.analyticsPath + '/BeatsByMonths');
  }

  getUserLikesPerMonth(): Observable<LikeAnalytics> {
    return this.http.get<LikeAnalytics>(this.analyticsPath + '/LikesByMonths');
  }

  getListenersByCountry(): Observable<Array<CountryAnalytics>> {
    return this.http.get<Array<CountryAnalytics>>(this.analyticsPath + '/ListenersByCountry');
  }
}
