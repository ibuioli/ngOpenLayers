import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OlMapComponent } from '../ol-map/ol-map.component';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as Proj from 'ol/proj';

@Component({
  selector: 'ol-map-marker',
  templateUrl: './ol-map-marker.component.html',
  styleUrls: ['./ol-map-marker.component.css']
})
export class OlMapMarkerComponent implements OnInit, OnDestroy {
  @Input() lat: number;
  @Input() lon: number;

  constructor(private olMap: OlMapComponent) { }

  ngOnInit(): void {
    console.log(this.olMap);
  }

  ngOnDestroy() {}

}
