import { Component, Input } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

export interface TableColumn {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  filters?: { text: string; value: any }[];
  // onFilter?: (value: any, record: any) => boolean;
  // render?: (data: any, record: any, index: number) => string | number | HTMLElement;
}

@Component({
  selector: 'app-shared-table',
  standalone: false,
  templateUrl: './custom-table.component.html'
})
export class SharedTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() bordered = true;
  @Input() size: 'small' | 'middle' | 'default' = 'middle';

  pageSize = 5;
  pageIndex = 1;
  total = 0;
  displayData: any[] = [];

  ngOnChanges() {
    this.total = this.data.length;
    this.refreshDisplayData();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize, sort, filter } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;

    let filteredData = [...this.data];

    // Filter
    // filter.forEach(f => {
    //   if (f.value && f.value.length > 0) {
    //     const col = this.columns.find(c => c.key === f.key);
    //     if (col?.onFilter) {
    //       filteredData = filteredData.filter(item =>
    //           // @ts-ignore
    //           f.value.some(val => col.onFilter!(val, item))
    //       );
    //     }
    //   }
    // });

    // Sort
    sort.forEach(s => {
      if (s.value) {
        filteredData = filteredData.sort((a, b) =>
            s.value === 'ascend'
                ? (a[s.key] > b[s.key] ? 1 : -1)
                : (a[s.key] < b[s.key] ? 1 : -1)
        );
      }
    });

    this.total = filteredData.length;
    this.displayData = filteredData.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
    );
  }

  private refreshDisplayData() {
    this.displayData = this.data.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
    );
  }
}
