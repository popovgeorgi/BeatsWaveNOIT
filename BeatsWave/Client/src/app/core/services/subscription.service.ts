import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private subscriptionPath = environment.apiUrl + '/subscriptions';
  constructor(private http: HttpClient) { }

  changeSubscription(subscription: string) {
    return this.http.put(this.subscriptionPath, {'subscription': subscription});
  }
}
