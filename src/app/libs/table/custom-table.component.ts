// shared/custom-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  standalone: false,
  templateUrl: './custom-table.component.html',
})
export class CustomTableComponent<T> {
  @Input() columns: Array<{ key: string; title: string }> = [];
  @Input() data: T[] = [];
  @Input() loading = false;

  @Input() pageSize = 10;
  @Input() pageIndex = 1;
  @Input() total = 0;

  @Output() pageIndexChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<{ key: string; value: string }>();

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.pageIndexChange.emit(index);
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageSizeChange.emit(size);
  }

  onSort(key: string, value: string): void {
    this.sortChange.emit({ key, value });
  }
}
