import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OlMapComponent } from './ol-map/ol-map.component';
import { OlMapMarkerComponent } from './ol-map-marker/ol-map-marker.component';

@NgModule({
  declarations: [
    AppComponent,
    OlMapComponent,
    OlMapMarkerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
