# NgOpenLayers

Simple component for integrate OpenLayers to Angular project

## How use it?

Move ol-maps folder to app folder in your Angular project. Import OL Module in modules when need the OL Maps:

```typescript
import { OlMapsModule } from './ol-maps/ol-maps.module';
```

Then set it:

```typescript
imports: [
    OlMapsModule
]
```

Finally, on index.html import OL css:

```html
<link rel="stylesheet" href="https://openlayers.org/en/v6.1.1/css/ol.css" type="text/css">
```

## Component OlMapComponent Inputs

* lat: number (Latitude value of center)
* lon: number (Longitude value of center)
* zoom: number (Zoom data to map)
* width: string (CSS data for width)
* height: string (CSS data for height)

## Component OlMapMarkerComponent Inputs

* lat: number (Latitude value of marker)
* lon: number (Longitude value of marker)
* icon: string (Path to image for marker)
* anchor number[] (Number array of icon anchor)

---
Contact: ibuioli@gmail.com
