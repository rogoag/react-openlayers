import * as React from "react";
import * as ReactDOM from "react-dom";

import olMap from 'ol/map';
import Style from 'ol/style/style';
import CircleStyle from 'ol/style/circle';
import FillStyle from 'ol/style/fill';
import StrokeStyle from 'ol/style/stroke';
import GPXFormat from 'ol/format/gpx';
import GeoJSONFormat from 'ol/format/geojson';
import IGCFormat from 'ol/format/igc';
import KMLFormat from 'ol/format/kml';
import TopoJSONFormat from 'ol/format/topojson';
import VectorSource from 'ol/source/vector';
import VectorLayer from 'ol/layer/vector';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

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

const styleFunction = function(feature, resolution) {
  var featureStyleFunction = feature.getStyleFunction();
  if (featureStyleFunction) {
    return featureStyleFunction.call(feature, resolution);
  } else {
    return defaultStyle[feature.getGeometry().getType()];
  }
};

export class DragAndDrop extends React.Component<any, any> {
  map: olMap = null;

  handleAddFeatures = event => {
    var vectorSource = new VectorSource({
      features: event.features
    });
    this.map.addLayer(new VectorLayer({
      source: vectorSource,
      style: styleFunction
    }));
    this.map.getView().fit(vectorSource.getExtent());
  }

  render() {
    return (
      <div>
        <h4>The <code>drag-and-drop</code> interaction allows to import files from various formats directly into the map.</h4>
        <h5>See <a href="http://openlayers.org/en/v4.6.5/examples/drag-and-drop.html">official OpenLayers Drag-and-Drop example</a></h5>
        <p>

          Copy the following code into a <code>drag-and-drop-example.json</code> file on your desktop, then drag-and-drop it on the map :
        </p>
        <pre>{`
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [125.6, 10.1]
          },
          "properties": {
            "name": "Dinagat Islands"
          }
        }
        `}
        </pre>
        <Map view={{ center: [0, 0], zoom: 2 }} mapRef={map => this.map = map}>
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
        </Map>
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/interactions/drag-and-drop.tsx">source</a>
        <pre>{`
        <Map view={{ center: [0, 0], zoom: 2 }} mapRef={map => this.map = map}>
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
        </Map>
        `}</pre>
      </div>
    );
  }
}