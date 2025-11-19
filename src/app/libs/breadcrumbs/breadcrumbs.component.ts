import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from './breadcrumbs.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumbs.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule ],
})
export class BreadcrumbComponent implements OnInit {
    breadcrumbs: any[] = [];

    constructor(private breadcrumbService: BreadcrumbService) { }

    ngOnInit(): void {
        this.breadcrumbService.getBreadcrumbs().subscribe(data => {
            this.breadcrumbs = data;
        });
    }
}
