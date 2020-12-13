import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
    selector: 'app-user-plan',
    templateUrl: './user-plan.component.html'
})
export class UserPlanComponent implements OnInit, AfterViewInit {

    constructor(private spinner: NgxSpinnerService,
      private authService: AuthService,
      private subscriptionService: SubscriptionService,
      private snotifyService: SnotifyService) { }

    userSubscription: string;

    ngOnInit() {
      this.userSubscription = this.authService.user.value.subscription;
    }

    ngAfterViewInit() {
        this.spinner.hide('routing');
    }

    onBasicClicked() {
      return this.subscriptionService.changeSubscription('Basic').subscribe(res => {
        this.userSubscription = 'Basic';
        this.snotifyService.success('You have successfully changed your plan!');
      });
    }

    onFeaturedClicked() {
      return this.subscriptionService.changeSubscription('Featured').subscribe(res => {
        this.userSubscription = 'Featured';
        this.snotifyService.success('You have successfully changed your plan!');
      });
    }

    onPremiumClicked() {
      return this.subscriptionService.changeSubscription('Premium').subscribe(res => {
        this.userSubscription = 'Premium';
        this.snotifyService.success('You have successfully changed your plan!');
      });
    }

}
