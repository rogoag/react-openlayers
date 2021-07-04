import * as React from 'react';
import VectorImageLayer from 'ol/layer/VectorImage';
import { LayerType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
import { Options } from 'ol/layer/BaseVector';
import VectorSource from 'ol/source/Vector';
export interface VectorProps extends Options, LayerType<VectorImageLayer> {
    onChange?: ReactOpenlayersEvent;
    onChangeExtent?: ReactOpenlayersEvent;
    onChangeMinResolution?: ReactOpenlayersEvent;
    onChangeMaxResolution?: ReactOpenlayersEvent;
    onChangeOpacity?: ReactOpenlayersEvent;
    onChangePreload?: ReactOpenlayersEvent;
    onChangeSource?: ReactOpenlayersEvent;
    onChangeVisible?: ReactOpenlayersEvent;
    onChangeZIndex?: ReactOpenlayersEvent;
    onPostcompose?: ReactOpenlayersEvent;
    onPrecompose?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
    onRender?: ReactOpenlayersEvent;
}
export interface VectorEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:extent': ReactOpenlayersEvent;
    'change:maxResolution': ReactOpenlayersEvent;
    'change:minResolution': ReactOpenlayersEvent;
    'change:opacity': ReactOpenlayersEvent;
    'change:preload': ReactOpenlayersEvent;
    'change:source': ReactOpenlayersEvent;
    'change:visible': ReactOpenlayersEvent;
    'change:zIndex': ReactOpenlayersEvent;
    'postcompose': ReactOpenlayersEvent;
    'precompose': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
    'render': ReactOpenlayersEvent;
}
export declare class VectorImage extends React.Component<VectorProps> {
    static contextType: React.Context<MapContextType>;
    layer?: VectorImageLayer;
    source?: VectorSource;
    pointStyleFunc?: Function;
    polygonStyleFunc?: Function;
    multiPolygonStyleFunc?: Function;
    linestringStyleFunc?: Function;
    options: Options;
    events: VectorEvents;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: VectorProps): void;
    componentWillUnmount(): void;
}
