import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
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
    private snotifyService: SnotifyService) {
    this.snotifyService.config = ToastDefaults;
  }

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
      this.snotifyService.info('You have successfully changed your plan!', '', {
        showProgressBar: false
      });
    });
  }

  onFeaturedClicked() {
    return this.subscriptionService.changeSubscription('Featured').subscribe(res => {
      this.userSubscription = 'Featured';
      this.snotifyService.info('You have successfully changed your plan!', '', {
        showProgressBar: false
      });
    });
  }

  onPremiumClicked() {
    return this.subscriptionService.changeSubscription('Premium').subscribe(res => {
      this.userSubscription = 'Premium';
      this.snotifyService.info('You have successfully changed your plan!', '', {
        showProgressBar: false
      });
    });
  }

}
