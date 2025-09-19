import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
// import { OrdAuthGuardService } from '@app/libs/guards/auth-guard.service';
// import { OrdPermissionGuardService } from '@app/libs/guards/permission-guard.service';

const routes: Routes = [
  // {
  //   path: 'account',
  //   loadChildren: () =>
  //     import('./pages/auth/auth.module').then(m => m.AuthModule),
  // },
  // {
  //   path: 'app',
  //   loadChildren: () =>
  //     import('./layout/ubold/ubold-layout.module').then(
  //       m => m.UboldLayoutModule
  //     ),
  //   canActivate: [OrdAuthGuardService, OrdPermissionGuardService],
  // },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(
        m => m.HomeModule
      ),
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: '/auth' },
  { path: '**', redirectTo: '/auth' }
];
// preloadingStrategy: PreloadAllModules,
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
