import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SelectorComponent } from './selector/selector.component';
import { OrganiserComponent } from './organiser/organiser.component';
import { MomentPipe } from './shared/moment.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SelectorComponent,
    OrganiserComponent,
    MomentPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
