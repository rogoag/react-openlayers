import * as React from "react";
import * as ReactDOM from "react-dom";

import Attribution from 'ol/attribution';
import VectorTileSource from 'ol/source/vectortile';
import TopoJSONFormat from 'ol/format/topojson';
import olTilegrid from 'ol/tilegrid';
import olProj from 'ol/proj';
import Style from 'ol/style/style';
import FillStyle from 'ol/style/fill';
import StrokeStyle from 'ol/style/stroke';

import * as olms from 'ol-mapbox-style'; // in case we use olms
import * as qwest from 'qwest';          // in case we need to do ajax call

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

var key = 'mapzen-2pRGhe5';

var attribution = [new Attribution({
  html: '&copy; OpenStreetMap contributors, Who’s On First, Natural Earth, and openstreetmapdata.com'
})];
var format = new TopoJSONFormat();
var tileGrid = olTilegrid.createXYZ({ maxZoom: 19 });
var roadStyleCache = {};
var roadColor = {
  'major_road': '#776',
  'minor_road': '#ccb',
  'highway': '#f39'
};
var buildingStyle = new Style({
  fill: new FillStyle({
    color: '#666',
    // opacity: 0.4
  }),
  stroke: new StrokeStyle({
    color: '#444',
    width: 1
  })
});

var source1 = new VectorTileSource({
  projection: undefined,
  attributions: attribution,
  format: format,
  tileGrid: tileGrid,
  url: 'https://tile.mapzen.com/mapzen/vector/v1/water/{z}/{x}/{y}.topojson?api_key=' + key
});
var style1 = new Style({
  fill: new FillStyle({
    color: '#9db9e8'
  })
});
var source2 = new VectorTileSource({
  projection: undefined,
  attributions: attribution,
  format: format,
  tileGrid: tileGrid,
  url: 'https://tile.mapzen.com/mapzen/vector/v1/roads/{z}/{x}/{y}.topojson?api_key=' + key
});
var style2 = function (feature) {
  var kind = feature.get('kind');
  var railway = feature.get('railway');
  var sort_key = feature.get('sort_key');
  var styleKey = kind + '/' + railway + '/' + sort_key;
  var style = roadStyleCache[styleKey];
  if (!style) {
    var color, width;
    if (railway) {
      color = '#7de';
      width = 1;
    } else {
      color = roadColor[kind];
      width = kind == 'highway' ? 1.5 : 1;
    }
    style = new Style({
      stroke: new StrokeStyle({
        color: color,
        width: width
      }),
      zIndex: sort_key
    });
    roadStyleCache[styleKey] = style;
  }
  return style;
};
var source3 = new VectorTileSource({
  projection: undefined,
  attributions: attribution,
  format: format,
  tileGrid: tileGrid,
  url: 'https://tile.mapzen.com/mapzen/vector/v1/buildings/{z}/{x}/{y}.topojson?api_key=' + key
});
var style3 = function (f, resolution) {
  return (resolution < 10) ? buildingStyle : null;
};


export class OSMVectorTiles extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Map view={{ center: olProj.fromLonLat([-74.0064, 40.7142]), maxZoom: 19, zoom: 15 }}>
          <Layers>
            <layer.VectorTile source={source1} style={style1} />
            <layer.VectorTile source={source2} style={style2} />
            <layer.VectorTile source={source3} style={style3} />
          </Layers>
        </Map>
        <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/layers/osm-vector-tiles.tsx">Source Code</a>
        <pre>{`
        <Map view={{center: olProj.fromLonLat([-74.0064, 40.7142]), maxZoom: 19, zoom: 15 }}>
          <Layers>
            <layer.VectorTile source={source1} style={style1} />
            <layer.VectorTile source={source2} style={style2} />
            <layer.VectorTile source={source3} style={style3} />
          </Layers>
        </Map>
        `}</pre>
      </div>
    );
  }
}
