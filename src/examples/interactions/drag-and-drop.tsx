import * as React from "react";

import { Divider, Typography } from "@material-ui/core";

import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import Projection from 'ol/proj/Projection';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle';
import FillStyle from 'ol/style/Fill';
import StrokeStyle from 'ol/style/Stroke';
import Style from 'ol/style/Style';

import { interaction, Interactions, layer, Layers, MapReact } from "react-openlayers";


import Highlighter from "../Highlighter";

const defaultStyle = {
  'Point': new Style({
    image: new CircleStyle({
      fill: new FillStyle({
        color: 'rgba(255,255,0,0.5)'
      }),
      radius: 5,
      stroke: new StrokeStyle({
        color: '#ff0',
        width: 1
      })
    })
  }),
  'LineString': new Style({
    stroke: new StrokeStyle({
      color: '#f00',
      width: 3
    })
  }),
  'Polygon': new Style({
    fill: new FillStyle({
      color: 'rgba(0,255,255,0.5)'
    }),
    stroke: new StrokeStyle({
      color: '#0ff',
      width: 1
    })
  }),
  'MultiPoint': new Style({
    image: new CircleStyle({
      fill: new FillStyle({
        color: 'rgba(255,0,255,0.5)'
      }),
      radius: 5,
      stroke: new StrokeStyle({
        color: '#f0f',
        width: 1
      })
    })
  }),
  'MultiLineString': new Style({
    stroke: new StrokeStyle({
      color: '#0f0',
      width: 3
    })
  }),
  'MultiPolygon': new Style({
    fill: new FillStyle({
      color: 'rgba(0,0,255,0.5)'
    }),
    stroke: new StrokeStyle({
      color: '#00f',
      width: 1
    })
  })
};

const styleFunction = (feature: Feature, resolution: number) => {
  const featureStyleFunction = feature.getStyleFunction();
  if (featureStyleFunction) {
    return featureStyleFunction.call(feature, resolution);
  } else {
    const featGeom = feature.getGeometry();
    const featType = featGeom && featGeom.getType();
    return featType && defaultStyle[featType];
  }
};

export class DragAndDrop extends React.Component {
  public map: Map;

  public handleAddFeatures = () => {
    const vectorSource = new VectorSource({
      features: []
    });
    if (this.map) {
      this.map.addLayer(new VectorLayer({
        source: vectorSource,
        style: styleFunction
      }));
      this.map.getView().fit(vectorSource.getExtent());

    }
  }


  public render() {
    return (
      <div>
        <Typography variant="h4" paragraph>DragAndDrop interaction</Typography>
        <Typography variant="subtitle1">The <code>drag-and-drop</code> interaction allows to import files from various formats directly into the map.</Typography>
        <Typography variant="caption">
          See <a href="http://openlayers.org/en/v4.6.5/examples/drag-and-drop.html">official OpenLayers Drag-and-Drop example</a>
        </Typography>
        <br/>
        <Typography variant="subtitle2">
          Copy the following code into a <code>drag-and-drop-example.json</code> file on your desktop, then drag-and-drop it on the map :
        </Typography>
        <div style={{fontSize: "0.75em"}}>
          <Highlighter
            lang="json"
            code={
`{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}`
          } />
        </div>
        <MapReact view={{ center: [0, 0], zoom: 2 }} mapRef={this.handleMapRef}>
          <Layers>
            <layer.TileReact />
          </Layers>
          <Interactions>
            <interaction.DragAndDropReact
              projection={new Projection({ code: "EPSG:3857" })}
              onAddfeatures={this.handleAddFeatures}
            />
          </Interactions>
        </MapReact>
        <br/>
        <Divider />
        <br/>
        <Highlighter lang="jsx"  code={
`<Map view={{ center: [0, 0], zoom: 2 }} mapRef={map => this.map = map}>
  <Layers>
    <layer.Tile />
  </Layers>
  <Controls>
    <interaction.DragAndDrop
      formatConstructors={[
        GPXFormat,
        GeoJSONFormat,
        IGCFormat,
        KMLFormat,
        TopoJSONFormat
      ]}
      onAddfeatures={this.handleAddFeatures}
    />
  </Controls>
</Map>`
        } />
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/drag-and-drop.tsx">source</a>
      </div>
    );
  }

  private handleMapRef = (map: Map) => this.map = map;
}