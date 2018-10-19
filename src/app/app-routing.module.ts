import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'login', loadChildren: './Extra/Auths/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './Extra/Auths/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'forgotPassword', loadChildren: './Extra/Auths/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'terms', loadChildren: './Extra/Legals/terms/terms.module#TermsPageModule' },
  { path: 'privacy', loadChildren: './Extra/Legals/privacy/privacy.module#PrivacyPageModule' },
  { path: 'browse', loadChildren: './Extra/Subs/browse/browse.module#BrowsePageModule' },
  { path: 'post/:id', loadChildren: './Extra/Subs/post-view/post-view.module#PostViewPageModule' },
  { path: 'category/:cat', loadChildren: './Extra/Subs/categories-view/categories-view.module#CategoriesViewPageModule' },
  { path: 'level/:level', loadChildren: './Extra/Subs/level/level.module#LevelPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
