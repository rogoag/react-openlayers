import * as React from 'react';

import * as Controls from 'ol/control';
import Control from 'ol/control/Control';
import * as Interactions from 'ol/interaction';
import Interaction from 'ol/interaction/Interaction';
import Layer from 'ol/layer/Layer';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View, { ViewOptions } from 'ol/View';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import MapEvent from 'ol/MapEvent';
import Event from 'ol/render/Event';
import { MapOptions } from 'ol/PluggableMap';
import Collection from 'ol/Collection';

import Util, { Omit, ReactOpenlayersEvent, ReactOpenlayersEvents } from './util';

import './map.css';
import 'ol/ol.css';
import { Coordinate } from 'ol/coordinate';

export type MapContextType = MapReact | void;
export const MapContext = React.createContext<MapContextType>(undefined);


export interface MapProps extends Omit<MapOptions, 'view'> {
  projection?: string
  center?: { value: Coordinate }
  zoom?: { value: number }
  className?: string
  view?: ViewOptions
  style?: React.CSSProperties
  onChange?: ReactOpenlayersEvent
  onChangeLayerGroup?: ReactOpenlayersEvent
  onChangeSize?: ReactOpenlayersEvent
  onChangeTarget?: ReactOpenlayersEvent
  onChangeView?: ReactOpenlayersEvent
  onClick?: ReactOpenlayersEvent<MapBrowserEvent>
  onDblclick?: ReactOpenlayersEvent<MapBrowserEvent>
  onMovestart?: ReactOpenlayersEvent<MapEvent>
  onMoveend?: ReactOpenlayersEvent<MapEvent>
  onPointerdrag?: ReactOpenlayersEvent<MapBrowserEvent>
  onPointermove?: ReactOpenlayersEvent<MapBrowserEvent>
  onPostcompose?: ReactOpenlayersEvent<Event>
  onPostrender?: ReactOpenlayersEvent<MapEvent>
  onPrecompose?: ReactOpenlayersEvent<Event>
  onPropertychange?: ReactOpenlayersEvent
  onSingleclick?: ReactOpenlayersEvent<MapBrowserEvent>
  mapRef?(map: Map): void
}

export interface MapEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:layerGroup': ReactOpenlayersEvent
  'change:size': ReactOpenlayersEvent
  'change:target': ReactOpenlayersEvent
  'change:view': ReactOpenlayersEvent
  'click': ReactOpenlayersEvent<MapBrowserEvent>
  'dblclick': ReactOpenlayersEvent<MapBrowserEvent>
  'movestart': ReactOpenlayersEvent<MapEvent>
  'moveend': ReactOpenlayersEvent<MapEvent>
  'pointerdrag': ReactOpenlayersEvent<MapBrowserEvent>
  'pointermove': ReactOpenlayersEvent<MapBrowserEvent>
  'postcompose': ReactOpenlayersEvent<Event>
  'postrender': ReactOpenlayersEvent<MapEvent>
  'precompose': ReactOpenlayersEvent<Event>
  'propertychange': ReactOpenlayersEvent
  'singleclick': ReactOpenlayersEvent<MapBrowserEvent>
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
export class MapReact extends React.Component<MapProps> {

  public map: Map;
  public mapDiv: React.RefObject<HTMLDivElement>;

  public layers: Collection<Layer> = new Collection([]);
  public interactions: Collection<Interaction> = Interactions.defaults();
  public controls: Collection<Control> = Controls.defaults();
  public overlays: Overlay[] = [];

  public options: MapOptions = {
    pixelRatio: undefined,
    keyboardEventTarget: undefined,
    view: new View({ center: [0, 0], zoom: 3 }),
    controls: undefined,
    interactions: undefined,
    layers: undefined,
    overlays: undefined
  };

  public events: MapEvents = {
    'change': undefined,
    'change:layerGroup': undefined,
    'change:size': undefined,
    'change:target': undefined,
    'change:view': undefined,
    'click': undefined,
    'dblclick': undefined,
    'movestart': undefined,
    'moveend': undefined,
    'pointerdrag': undefined,
    'pointermove': undefined,
    'postcompose': undefined,
    'postrender': undefined,
    'precompose': undefined,
    'propertychange': undefined,
    'singleclick': undefined
  };

  constructor(props: MapProps) {
    super(props);
    this.mapDiv = React.createRef<HTMLDivElement>();
  }

  public componentDidMount() {
    const options = Util.getOptions<MapOptions, MapProps>(this.options, this.props);
    if (options.view) {
      options.view = new View({
        ...options.view as ViewOptions, 
        center: this.props.center ? this.props.center.value: [0, 0],
        zoom: this.props.zoom ? this.props.zoom.value: 10,
      });
    }

    options.controls = this.controls;
    options.interactions = this.interactions;

    options.layers = this.layers;
    options.overlays = this.overlays;
    this.map = new Map(options);
    if (this.props.target) {
      this.map.setTarget(this.props.target);
    } else if (this.mapDiv.current) {
      this.map.setTarget(this.mapDiv.current);
    }
    this.updateFromProps(this.props, /* isMounting = */ true);

    if (this.props.mapRef) this.props.mapRef(this.map);

    //regitster events
    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.map.on(eventName, olEvents[eventName]);
    })
  }

  public componentWillReceiveProps(nextProps: MapProps) {
    this.updateFromProps(nextProps, false);
  }

  public componentDidUpdate() {
    if (this.map && this.mapDiv.current) {
      this.map.setTarget(this.mapDiv.current);
    }
  }

  public render() {
    console.log('render map');
    return (
      <MapContext.Provider value={this}>
        <div
          className={(this.props.className || "openlayers-map")}
          ref={this.mapDiv}
          tabIndex={0}
          style={this.props.style}
        >
          {this.props.children}
        </div>
      </MapContext.Provider>
    );

  }

  public componentWillUnmount() {
    // this.map.setTarget(undefined)
  }

  private updateFromProps(props: MapProps, isMounting: boolean) {
    if (isMounting || props.center || props.zoom) {
      // Update the center and the resolution of the view only when it is
      // mounted the first time but not when the properties are updated.
      // *Unless* we're passed a position object that explicitly declares
      // that we need to update.
      this.updateCenterAndResolutionFromProps(props)
    }
  }

  private updateCenterAndResolutionFromProps(props: MapProps) {
    const view = this.map.getView();

    if (props.center && props.center !== this.props.center) {
      view.setCenter(props.center.value)
    }

    if(props.zoom && props.zoom !== this.props.zoom) {
      view.setZoom(props.zoom.value)
    }
  }
}
