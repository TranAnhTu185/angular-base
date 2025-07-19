import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        data: {
          title: 'MeetCoach | Elevate Your Life with Online Coaching Platform',
          description:
            'Discover top-notch Online Counseling, and Coaching at MeetCoach. Elevate your professional growth with our premier Online Coaching Platform.',
          ogUrl: 'meetcoach.com',
        },
      },
    ]),
  ],
})
export class HomePageRoutingModule {}
