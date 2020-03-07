import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OlMapsModule } from './ol-maps/ol-maps.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    OlMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
