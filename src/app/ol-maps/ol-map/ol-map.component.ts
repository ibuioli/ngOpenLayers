import { Component, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import * as Proj from 'ol/proj';
import {
  defaults as defaultControls,
  FullScreen,
  MousePosition,
  OverviewMap,
  ScaleLine,
  ZoomSlider,
  ZoomToExtent
} from 'ol/control';

export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_WIDTH = '500px';

export const DEFAULT_LAT = -34.603490361131385;
export const DEFAULT_LON = -58.382037891217465;

@Component({
  selector: 'ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements OnInit, AfterViewInit {
  @Input() lat: number = DEFAULT_LAT;
  @Input() lon: number = DEFAULT_LON;
  @Input() zoom: number;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;
  @Input() isFullScreen: boolean;
  @Input() isMousePosition: boolean;
  @Input() isOverviewMap: boolean;
  @Input() isScaleLine: boolean;
  @Input() isZoomSlider: boolean;
  @Input() isZoomToExtent: boolean;

  target: string = 'map-' + Math.random().toString(36).substring(2);

  map: Map;
  controls: any = [];

  private mapEl: HTMLElement;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    if (this.isFullScreen) {
      this.controls.push(new FullScreen());
    }
    if (this.isMousePosition) {
      this.controls.push(new MousePosition());
    }
    if (this.isOverviewMap) {
      this.controls.push(new OverviewMap());
    }
    if (this.isScaleLine) {
      this.controls.push(new ScaleLine());
    }
    if (this.isZoomSlider) {
      this.controls.push(new ZoomSlider());
    }
    if (this.isZoomToExtent) {
      this.controls.push(new ZoomToExtent());
    }
  }

  ngAfterViewInit(): void {
    this.mapEl = this.elementRef.nativeElement.querySelector('#' + this.target);
    this.setSize();

    this.map = new Map({
      target: this.target,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: Proj.fromLonLat([this.lon, this.lat]),
        zoom: this.zoom
      }),
      controls: defaultControls().extend(this.controls),
    });
  }

  private setSize() {
    if (this.mapEl) {
      const styles = this.mapEl.style;
      styles.height = coerceCssPixelValue(this.height) || DEFAULT_HEIGHT;
      styles.width = coerceCssPixelValue(this.width) || DEFAULT_WIDTH;
    }
  }

  public setMarker(vector: VectorLayer) {
    this.map.addLayer(vector);
  }

}

const cssUnitsPattern = /([A-Za-z%]+)$/;

function coerceCssPixelValue(value: any): string {
  if (value == null) {
    return '';
  }

  return cssUnitsPattern.test(value) ? value : `${value}px`;
}
