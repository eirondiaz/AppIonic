import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    canActivate: [LoggedGuard],
    loadChildren: () => import('./components/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    canActivate: [LoggedGuard],
    loadChildren: () => import('./components/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'crearsecretos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/crearsecretos/crearsecretos.module').then( m => m.CrearsecretosPageModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'miperfil',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/miperfil/miperfil.module').then( m => m.MiperfilPageModule)
  },
  {
    path: 'updatedata',
    loadChildren: () => import('./components/updatedata/updatedata.module').then( m => m.UpdatedataPageModule)
  },
  {
    path: 'changepass',
    loadChildren: () => import('./components/changepass/changepass.module').then( m => m.ChangepassPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
