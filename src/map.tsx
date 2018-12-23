import * as React from 'react';

import olView from 'ol/view';
import olMap from 'ol/map';
import olControl from 'ol/control';
import olInteraction from 'ol/interaction';
import olOverlay from 'ol/overlay';

import { Util } from './util';
import { Layers } from './layers/layers';
import { layer } from './layers/index';

import './ol.css';
import './map.css';

export interface MapContextType {
  mapComp: Map;
  map: olMap;
}

export const MapContext = React.createContext<MapContextType>({
  mapComp: undefined,
  map: undefined,
});

export type MapOptions = ol.olx.MapOptions; 

export interface MapProps extends MapOptions {
  mapRef?(map: olMap):void
}

/**
 * Implementation of ol.map https://openlayers.org/en/latest/apidoc/ol.Map.html
 *
 * example:
 * <Map view={{center: [0, 0], zoom: 1}} mapRef={map => this.map = map}>
 *   <layers>
 *     <layer.Tile source={new ol.source.OSM()} />
 *     <layer.Vector options={}/>
 *   </layers>
 *   <controls></controls>
 *   <interactions></interactions>
 *   <overlays></overlays>
 * </Map>
 */
export class Map extends React.Component<any, any> {

  map: olMap;
  mapDiv: any;

  layers: any[] = [];
  interactions: any[] = [];
  controls: any[] = [];
  overlays: any[] = [];

  options: MapOptions = {
    pixelRation: undefined,
    keyboardEventTarget: undefined,
    loadTilesWhileAnimation: undefined,
    loadTilesWhileInteractiong: undefined,
    logo: undefined,
    renderer: undefined,
    setCenter: undefined,
    setZoom: undefined,
    setResolution: undefined,
    view: new olView({ center: [0, 0], zoom: 3 }),
    controls: undefined,
    interactions: undefined,
    layers: undefined,
    overlays: undefined
  };

  events: any = {
    'change': undefined,
    'change:layerGroup': undefined,
    'change:size': undefined,
    'change:target': undefined,
    'change:view': undefined,
    'click': undefined,
    'dblclick': undefined,
    'moveend': undefined,
    'pointerdrag': undefined,
    'pointermove': undefined,
    'postcompose': undefined,
    'postrender': undefined,
    'precompose': undefined,
    'propertychange': undefined,
    'singleclick': undefined
  };

  componentDidMount() {
    let options = Util.getOptions(Object.assign(this.options, this.props));
    !(options.view instanceof olView) && (options.view = new olView(options.view));
    
    let controlsCmp = Util.findChild(this.props.children, 'Controls') || {};
    let interactionsCmp = Util.findChild(this.props.children, 'Interactions') || {};
    
    options.controls = olControl.defaults(controlsCmp.props).extend(this.controls);
    options.interactions = olInteraction.defaults(interactionsCmp.props).extend(this.interactions);
    
    options.layers = this.layers;
    options.overlays = this.overlays;
    this.map = new olMap(options);
    this.map.setTarget(options.target || this.mapDiv);

    if (this.props.mapRef) this.props.mapRef(this.map);

    //regitster events
    let olEvents = Util.getEvents(this.events, this.props);
    for (let eventName in olEvents) {
      this.map.on(eventName, olEvents[eventName]);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.view && nextProps.view.center !== this.props.view.center) {
      this.map.getView().setCenter(nextProps.view.center);
    }
    if (this.props.view && nextProps.view.zoom !== this.props.view.zoom) {
      this.map.getView().setZoom(nextProps.view.zoom);
    }
  }

  // Prevents misbehavior, maybe there's a cleaner way to achieve that
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <div className="openlayers-map" ref={(el) => this.mapDiv = el}>
          <MapContext.Provider value={{ map: this.map, mapComp: this }}>
            {this.props.children}
          </MapContext.Provider>
        </div>
      </div>
    );

  }

  componentWillUnmount() {
    this.map.setTarget(undefined)
  }
}
