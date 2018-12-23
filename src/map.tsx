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

export const MapContext = React.createContext<Map|void>(null);

export type MapOptions = ol.olx.MapOptions;

export interface MapProps extends MapOptions {
  mapRef?(map: olMap): void
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

  constructor(props) {
    super(props);
    this.mapDiv = React.createRef();
  }

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
    this.updateFromProps(this.props, /* isMounting = */ true);

    if (this.props.mapRef) this.props.mapRef(this.map);

    //regitster events
    let olEvents = Util.getEvents(this.events, this.props);
    for (let eventName in olEvents) {
      this.map.on(eventName, olEvents[eventName]);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateFromProps(nextProps, false);
  }

  componentDidUpdate() {
    if (this.map) {
      this.map.setTarget(this.mapDiv);
      this.map.updateSize();
      this.map.renderSync();
    }
  }

  private updateFromProps(props: any, isMounting: boolean) {
    if (isMounting || (props.view && props.view.position && props.view.position.allowUpdate)) {
      // Update the center and the resolution of the view only when it is
      // mounted the first time but not when the properties are updated.
      // *Unless* we're passed a position object that explicitly declares
      // that we need to update.
      this.updateCenterAndResolutionFromProps(props)
    }
  }

  private updateCenterAndResolutionFromProps(props: any) {
    const view = this.map.getView();

    // FIXME For standalone usage
    if (props.view && props.view.position && props.view.position.allowUpdate) {
      // The position object has declared that we need to update the map position (allowUpdate).
      // A position object is:
      // {
      //   zoom: Number = Required
      //   extent: ol.Extent = Optional
      //   center: ol.Coordinate = Optional
      // }
      if (typeof props.view.position.extent !== "undefined") {
        view.fit(props.view.position.extent, { size: this.map.getSize(), maxZoom: props.view.position.zoom })
      } else if (typeof props.view.position.center !== "undefined" && typeof props.view.position.zoom !== "undefined") {
        view.setCenter(props.view.position.center)
        view.setZoom(props.view.position.zoom)
      }
    } else if (props.view) {
      // Only used at mount time
      view.setCenter(props.view.center)
      if (typeof props.view.resolution !== "undefined") {
        view.setResolution(props.view.resolution)
      } else if (typeof props.view.zoom !== "undefined") {
        view.setZoom(props.view.zoom)
      }
    }
  }

  render() {
    return (
      <MapContext.Provider value={this}>
        <div className="openlayers-map" ref={ref => this.mapDiv = ref} tabIndex={0}>
          {this.props.children}
        </div>
      </MapContext.Provider>
    );

  }

  componentWillUnmount() {
    this.map.setTarget(undefined)
  }
}
