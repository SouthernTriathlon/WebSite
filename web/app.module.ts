import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app/app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { ResultsComponent } from './results/results.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { RateChartComponent } from './rate-chart/rate-chart.component';

var routes = RouterModule.forRoot([
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'event-info',
    component: EventInfoComponent
  },
  {
    path: 'results',
    component: ResultsComponent
  },
  {
    path: 'results/:year/category/:category/group/:group',
    component: ResultsComponent
  },
  {
    path: 'sponsors',
    component: SponsorsComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EventInfoComponent,
    ResultsComponent,
    SponsorsComponent,
    SponsorComponent,
    FooterComponent,
    MenuComponent,
    RateChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routes,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
