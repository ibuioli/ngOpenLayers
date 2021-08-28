import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OlMapComponent } from '../ol-map/ol-map.component';
import Vector from 'ol/source/Vector';
import OSM from 'ol/source/Vector';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Tile from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Polyline from 'ol/format/Polyline';
import * as Proj from 'ol/proj';

export const DEFAULT_1_LAT = 0;
export const DEFAULT_1_LON = 0;
export const DEFAULT_2_LAT = 0;
export const DEFAULT_2_LON = 0;

export const WIDTH = 6;
export const COLOR = [40, 40, 40, 0.8];

@Component({
  selector: 'ol-route',
  templateUrl: './ol-route.component.html',
  styleUrls: ['./ol-route.component.css']
})
export class OlRouteComponent implements OnInit, OnDestroy {
  @Input() lat1: number = DEFAULT_1_LAT;
  @Input() lon1: number = DEFAULT_1_LON;
  @Input() lat2: number = DEFAULT_2_LAT;
  @Input() lon2: number = DEFAULT_2_LON;

  @Input() width: number = WIDTH;
  @Input() color: any = COLOR;

  constructor(private olMap: OlMapComponent) { }

  ngOnInit(): void {
    const urlNearest = '//router.project-osrm.org/nearest/v1/driving/';
    const urlRoute = '//router.project-osrm.org/route/v1/driving/';

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource
    });
    const styles = {
      route: new Style({
        stroke: new Stroke({
          width: this.width, color: this.color
        })
      })
    };

    const utils = {
      getNearest: (coord: any) => {
        return new Promise((resolve, reject) => {
          fetch(urlNearest + coord.join()).then((response) => {
            return response.json();
          }).then((json) => {
            if (json.code === 'Ok'){
              resolve(json.waypoints[0].location);
            } else {
              reject();
            }
          });
        });
      },
      createFeature: (coord: any) => {
        const feature = new Feature({
          type: 'place',
          geometry: new Point(Proj.fromLonLat(coord))
        });
        vectorSource.addFeature(feature);
      },
      createRoute: (polyline: any) => {
        const route = new Polyline({
          factor: 1e5
        }).readGeometry(polyline, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });
        const feature = new Feature({
          type: 'route',
          geometry: route
        });
        feature.setStyle(styles.route);
        vectorSource.addFeature(feature);
      }
    };

    utils.getNearest([this.lon1, this.lat1]).then((coordStreet1: any) => {
      utils.getNearest([this.lon2, this.lat2]).then((coordStreet2: any) => {
        utils.createFeature(coordStreet2);

        const point1 = coordStreet2.join();
        const point2 = coordStreet1.join();

        fetch(urlRoute + point1 + ';' + point2).then((r) => {
          return r.json();
        }).then((json) => {
          if (json.code !== 'Ok') {
            console.log('No Route Found');
            return;
          }
          utils.createRoute(json.routes[0].geometry);

          if (this.olMap.map) {
            this.olMap.setMarker(vectorLayer);
          } else {
            setTimeout(() => {
              this.ngOnInit();
            }, 10);
          }

        });
      });
    });
  }

  ngOnDestroy() {}

}
