import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzImageModule } from 'ng-zorro-antd/image';
import { BaseComponent } from './components/base/base.component';
import { TokenInterceptor } from './services/token.interceptor';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NzButtonModule,
    NzIconModule,
    NzTypographyModule,
    NzDividerModule,
    NzGridModule,
    NzLayoutModule,
    NzSpaceModule,
    NzAffixModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzStepsModule,
    NzAutocompleteModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzMentionModule,
    NzRadioModule,
    NzRateModule,
    NzSelectModule,
    NzSliderModule,
    NzSwitchModule,
    NzTimePickerModule,
    NzTransferModule,
    NzTreeSelectModule,
    NzAvatarModule,
    NzBadgeModule,
    NzCommentModule,
    NzCollapseModule,
    NzCarouselModule,
    NzCardModule,
    NzCalendarModule,
    NzDescriptionsModule,
    NzEmptyModule,
    NzListModule,
    NzPopoverModule,
    NzStatisticModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTimelineModule,
    NzToolTipModule,
    NzTreeModule,
    NzAlertModule,
    NzDrawerModule,
    NzModalModule,
    NzMessageModule,
    NzNotificationModule,
    NzPopconfirmModule,
    NzProgressModule,
    NzResultModule,
    NzSpinModule,
    NzSkeletonModule,
    NzAnchorModule,
    NzBackTopModule,
    NzImageModule,

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NzButtonModule,
    NzIconModule,
    NzTypographyModule,
    NzDividerModule,
    NzGridModule,
    NzLayoutModule,
    NzSpaceModule,
    NzAffixModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzStepsModule,
    NzAutocompleteModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzMentionModule,
    NzRadioModule,
    NzRateModule,
    NzSelectModule,
    NzSliderModule,
    NzSwitchModule,
    NzTimePickerModule,
    NzTransferModule,
    NzTreeSelectModule,
    NzAvatarModule,
    NzBadgeModule,
    NzCommentModule,
    NzCollapseModule,
    NzCarouselModule,
    NzCardModule,
    NzCalendarModule,
    NzDescriptionsModule,
    NzEmptyModule,
    NzListModule,
    NzPopoverModule,
    NzStatisticModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTimelineModule,
    NzToolTipModule,
    NzTreeModule,
    NzAlertModule,
    NzDrawerModule,
    NzModalModule,
    NzMessageModule,
    NzNotificationModule,
    NzPopconfirmModule,
    NzProgressModule,
    NzResultModule,
    NzSpinModule,
    NzSkeletonModule,
    NzAnchorModule,
    NzBackTopModule,
    NzImageModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class SharedModule {}
