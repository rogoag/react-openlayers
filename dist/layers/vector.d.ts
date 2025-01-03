import * as React from 'react';
import VectorLayer from 'ol/layer/Vector';
import { LayerType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
import { Options } from 'ol/layer/BaseVector';
import VectorSource from 'ol/source/Vector';
import { VectorImage } from './vector-image';
export declare type VectorLayerContextType = Vector | VectorImage | void;
export declare const VectorLayerContext: React.Context<VectorLayerContextType>;
export interface VectorProps extends Options, LayerType<VectorLayer> {
    fadeInOptions?: {
        startOpacity: number;
        step: number;
        maxOpacity: number;
        interval: number;
    };
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
export declare class Vector extends React.Component<VectorProps> {
    static contextType: React.Context<MapContextType>;
    layer?: VectorLayer;
    source?: VectorSource;
    options: Options;
    events: VectorEvents;
    constructor(props: VectorProps);
    render(): JSX.Element;
    fadeInLayer(fadeInOptions: {
        startOpacity: number;
        step: number;
        maxOpacity: number;
        interval: number;
    }): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: VectorProps): void;
    componentWillUnmount(): void;
}
