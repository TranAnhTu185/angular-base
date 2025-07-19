import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { BehaviorSubject, debounceTime, filter, takeUntil, tap } from 'rxjs';
import { DestroyService } from '../../services/destroy-service.service';

@Component({
  selector: 'app-action-button',
  template: `
    <button nz-button class='ms-2'
            [nzType]='nzTypeButton'
            [nzDanger]='nzDanger'
            [nzShape]='nzShape'
            [nzSize]='nzSize'
            (click)='onClick()'
            [nzLoading]='loading'>
      <i *ngIf='nzIcon' nz-icon nzType='{{nzIcon}}' nzTheme='outline'></i>
      <span *ngIf='text'>{{text|translate}}</span>
    </button>`,
  standalone: false,
  providers: [DestroyService]
})
export class ActionButtonComponent implements OnInit {
  // button
  @Input() nzTypeButton: NzButtonType = 'primary';
  @Input() nzDanger: boolean = false;
  @Input() nzShape: NzButtonShape = null;
  @Input() nzSize: NzButtonSize = 'default';
  //icon
  @Input() nzIcon = '';
  //text
  @Input() text = '';
  @Input() loading = false;
  @Input() debounceTime = 50;
  @Output() clickEvent = new EventEmitter();
  click$ = new BehaviorSubject<number>(0);

  constructor(private destroy$: DestroyService) {
  }

  onClick() {
    this.click$.next(Number(new Date()));
  }

  ngOnInit(): void {
    this.click$.pipe(filter(s => s > 0), debounceTime(this.debounceTime), tap(() => {
      this.clickEvent.emit();
    }),
      takeUntil(this.destroy$)).subscribe();
  }
}
