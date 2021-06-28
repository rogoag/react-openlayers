import * as React from 'react';
import Control from 'ol/control/Control';
import Interaction from 'ol/interaction/Interaction';
import Layer from 'ol/layer/Layer';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import { ViewOptions } from 'ol/View';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import MapEvent from 'ol/MapEvent';
import Event from 'ol/render/Event';
import { MapOptions } from 'ol/PluggableMap';
import Collection from 'ol/Collection';
import { Omit, ReactOpenlayersEvent, ReactOpenlayersEvents } from './util';
import './map.css';
import 'ol/ol.css';
import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
export declare type MapContextType = MapReact | void;
export declare const MapContext: React.Context<MapContextType>;
export interface MapProps extends Omit<MapOptions, 'view'> {
    projection?: string;
    center?: {
        value: Coordinate;
    };
    zoom?: {
        value: number;
    };
    fit?: {
        value: Extent;
    };
    className?: string;
    view?: ViewOptions;
    style?: React.CSSProperties;
    onChange?: ReactOpenlayersEvent;
    onChangeLayerGroup?: ReactOpenlayersEvent;
    onChangeSize?: ReactOpenlayersEvent;
    onChangeTarget?: ReactOpenlayersEvent;
    onChangeView?: ReactOpenlayersEvent;
    onClick?: ReactOpenlayersEvent<MapBrowserEvent>;
    onDblclick?: ReactOpenlayersEvent<MapBrowserEvent>;
    onMovestart?: ReactOpenlayersEvent<MapEvent>;
    onMoveend?: ReactOpenlayersEvent<MapEvent>;
    onPointerdrag?: ReactOpenlayersEvent<MapBrowserEvent>;
    onPointermove?: ReactOpenlayersEvent<MapBrowserEvent>;
    onPostcompose?: ReactOpenlayersEvent<Event>;
    onPostrender?: ReactOpenlayersEvent<MapEvent>;
    onPrecompose?: ReactOpenlayersEvent<Event>;
    onPropertychange?: ReactOpenlayersEvent;
    onSingleclick?: ReactOpenlayersEvent<MapBrowserEvent>;
    mapRef?(map: Map): void;
}
export interface MapEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:layerGroup': ReactOpenlayersEvent;
    'change:size': ReactOpenlayersEvent;
    'change:target': ReactOpenlayersEvent;
    'change:view': ReactOpenlayersEvent;
    'click': ReactOpenlayersEvent<MapBrowserEvent>;
    'dblclick': ReactOpenlayersEvent<MapBrowserEvent>;
    'movestart': ReactOpenlayersEvent<MapEvent>;
    'moveend': ReactOpenlayersEvent<MapEvent>;
    'pointerdrag': ReactOpenlayersEvent<MapBrowserEvent>;
    'pointermove': ReactOpenlayersEvent<MapBrowserEvent>;
    'postcompose': ReactOpenlayersEvent<Event>;
    'postrender': ReactOpenlayersEvent<MapEvent>;
    'precompose': ReactOpenlayersEvent<Event>;
    'propertychange': ReactOpenlayersEvent;
    'singleclick': ReactOpenlayersEvent<MapBrowserEvent>;
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
export declare class MapReact extends React.Component<MapProps> {
    map: Map;
    mapDiv: React.RefObject<HTMLDivElement>;
    layers: Collection<Layer>;
    interactions: Collection<Interaction>;
    controls: Collection<Control>;
    overlays: Overlay[];
    clickCallback?: Function;
    options: MapOptions;
    events: MapEvents;
    constructor(props: MapProps);
    componentDidMount(): void;
    eventListenerCall(): void;
    componentWillReceiveProps(nextProps: MapProps): void;
    render(): JSX.Element;
    componentWillUnmount(): void;
    private updateFromProps;
    private updateCenterAndResolutionFromProps;
}
