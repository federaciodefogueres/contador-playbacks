import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerPageComponent } from './pages/timer-page/timer-page.component';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { ApiModule, BASE_PATH } from 'src/api';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TimerPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
  ],
  exports: [
    ComponentsModule,
    PagesModule,
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: environment.API_BASE_PATH
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
