# NgOpenLayers

Module for integrate OpenLayers to Angular project with Components

## How use it like Module in a Project?

Install dependencies:

```
npm i ol
npm i --save-dev @types/ol
```

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
## Components
### Component OlMapComponent Inputs

* lat: number (Latitude value of center)
* lon: number (Longitude value of center)
* zoom: number (Zoom data to map)
* width: string (CSS data for width)
* height: string (CSS data for height)

### Component OlMapMarkerComponent Inputs

* lat: number (Latitude value of marker)
* lon: number (Longitude value of marker)
* icon: string (Path to image for marker)
* anchor number[] (Number array of icon anchor)

### Component OlControlComponent Inputs

* control: string (Control name. Can be FullScreen, MousePosition, OverviewMap, ScaleLine, ZoomSlider or ZoomToExtent)
* options: object (Options for control)

---
Contact: ibuioli@gmail.com
