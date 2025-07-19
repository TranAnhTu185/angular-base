import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  providers: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  template: `
    <router-outlet></router-outlet>
    <ngx-ui-loader></ngx-ui-loader>
   
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular-app-studi';

  btnClickExportExcel() {}
}
