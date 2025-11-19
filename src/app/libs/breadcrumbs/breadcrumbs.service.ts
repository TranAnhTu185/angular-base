import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {

    constructor(private router: Router, private route: ActivatedRoute) { }

    getBreadcrumbs(): Observable<{ label: string; url: string }[]> {
        return this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.buildBreadcrumbs(this.route.root))
        );
    }


    private buildBreadcrumbs(
        route: ActivatedRoute,
        url: string = '',
        breadcrumbs: { label: string; url: string }[] = []
    ): { label: string; url: string }[] {
        const children = route.children;

        if (!children.length) {
            return breadcrumbs;
        }

        for (let child of children) {
            const routeURL = child.snapshot.url
                .map(segment => segment.path)
                .join('/');

            if (routeURL) {
                url += `/${routeURL}`;
            }

            const label = child.snapshot.data['breadcrumb'];

            if (label) {
                breadcrumbs.push({ label, url });
            }

            return this.buildBreadcrumbs(child, url, breadcrumbs);
        }

        return breadcrumbs;
    }
}
