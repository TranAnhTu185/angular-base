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
import { AppInputComponent } from "../libs/dynamic-form/app-input.component";
import { AppTextareaComponent } from "../libs/dynamic-form/app-textarea.component";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AppNumberInputComponent } from "../libs/dynamic-form/app-number-input.component";
import { AppSelectComponent } from "../libs/dynamic-form/app-select.component";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { AppCheckboxComponent } from "../libs/dynamic-form/app.checkbox.component";
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { AppSwitchComponent } from "../libs/dynamic-form/app-switch.component";
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { AppTimePickerComponent } from "../libs/dynamic-form/timpicker.component";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { AppDatePickerComponent } from "../libs/dynamic-form/datepicker.component";
import { CustomRangePickerComponent } from "../libs/dynamic-form/date-range-picker.component";
import { SharedTableComponent } from "../libs/table/custom-table.component";
import { NzTableModule } from 'ng-zorro-antd/table';


@NgModule({
  declarations: [
    ActionButtonComponent,
    AppInputComponent,
    AppTextareaComponent,
    AppNumberInputComponent,
    AppSelectComponent,
    AppCheckboxComponent,
    AppSwitchComponent,
    AppTimePickerComponent,
    AppDatePickerComponent,
    CustomRangePickerComponent,
    SharedTableComponent,
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
    NzFormModule, 
    NzIconModule,
    NzInputNumberModule,
    NzSelectModule,
    NzCheckboxModule,
    NzSwitchModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzTableModule,
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
    AppInputComponent,
    AppTextareaComponent,
    AppNumberInputComponent,
    AppSelectComponent,
    AppCheckboxComponent,
    AppSwitchComponent,
    AppTimePickerComponent,
    AppDatePickerComponent,
    CustomRangePickerComponent,
    SharedTableComponent,
  ],
  providers: [],
})
export class SharedModule { }
