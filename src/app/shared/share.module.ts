import { NgModule } from "@angular/core";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TranslateModule } from '@ngx-translate/core';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CommonModule } from "@angular/common";
import { ActionButtonComponent } from "../libs/action-button/component/action-button.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "../libs/dynamic-form/input/input.component";

@NgModule({
  declarations: [
    ActionButtonComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzDrawerModule,
    NzModalModule,
    TranslateModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzTabsModule,
    NzRadioModule,
    NzResultModule,
    NzDropDownModule,
    NzUploadModule,
    NzPopconfirmModule,
    FormsModule, 
    ReactiveFormsModule, 
    NzInputModule, 
    NzFormModule, 
    NzIconModule
  ],
  exports: [
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzDrawerModule,
    NzModalModule,
    TranslateModule,
    ActionButtonComponent,
    InputComponent,
  ],
  providers: [],
})
export class SharedModule { }
