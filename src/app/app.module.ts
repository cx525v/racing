import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AppService } from './app.service';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { LoginComponent } from './login/login.component';
import { EffectsModule} from '@ngrx/effects';
import { StoreModule} from '@ngrx/store';
import { AuthGuard } from './auth.guard';
// We may be missing a route...
const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'members',
    loadChildren: () => import('./members/members.module').then(m => m.MembersModule),
   // loadChildren: './members/members.module#MembersModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

// Notice how both FormsModule and ReactiveFormsModule imported...choices, choices!
@NgModule({
  declarations: [AppComponent, BannerComponent, LoginComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({})
  ],
  providers: [AppService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
