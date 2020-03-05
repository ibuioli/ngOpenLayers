import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OlMapComponent } from '../ol-map/ol-map.component';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as Proj from 'ol/proj';

export const DEFAULT_LAT = -34.603490361131385;
export const DEFAULT_LON = -58.382037891217465;

@Component({
  selector: 'ol-map-marker',
  templateUrl: './ol-map-marker.component.html',
  styleUrls: ['./ol-map-marker.component.css']
})
export class OlMapMarkerComponent implements OnInit, OnDestroy {
  @Input() lat: number = DEFAULT_LAT;
  @Input() lon: number = DEFAULT_LON;

  constructor(private olMap: OlMapComponent) { }

  ngOnInit(): void {
    const marker = new Feature({
      geometry: new Point(Proj.fromLonLat([this.lon, this.lat]))
    });

    const vectorSource = new VectorSource({
        features: [marker]
    });

    const vectorLayer = new VectorLayer({
        source: vectorSource
    });
    this.olMap.setMarker(vectorLayer);
  }

  ngOnDestroy() {}

}
