import * as React from 'react';
import Heatmap from 'ol/layer/Heatmap';
import { Options } from 'ol/layer/Heatmap';
import { LayerType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface HeatmapProps extends Options, LayerType<Heatmap> {
    zIndex?: number;
    onChange?: ReactOpenlayersEvent;
    onChangeBlur?: ReactOpenlayersEvent;
    onChangeExtent?: ReactOpenlayersEvent;
    onChangeGradient?: ReactOpenlayersEvent;
    onChangeMaxResolution?: ReactOpenlayersEvent;
    onChangeMinResolution?: ReactOpenlayersEvent;
    onChangeOpacity?: ReactOpenlayersEvent;
    onChangeRadius?: ReactOpenlayersEvent;
    onChangeSource?: ReactOpenlayersEvent;
    onChangeVisible?: ReactOpenlayersEvent;
    onChangeZIndex?: ReactOpenlayersEvent;
    onPostcompose?: ReactOpenlayersEvent;
    onPrecompose?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
    onRender?: ReactOpenlayersEvent;
}
export interface HeatmapEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:blur': ReactOpenlayersEvent;
    'change:extent': ReactOpenlayersEvent;
    'change:gradient': ReactOpenlayersEvent;
    'change:maxResolution': ReactOpenlayersEvent;
    'change:minResolution': ReactOpenlayersEvent;
    'change:opacity': ReactOpenlayersEvent;
    'change:radius': ReactOpenlayersEvent;
    'change:source': ReactOpenlayersEvent;
    'change:visible': ReactOpenlayersEvent;
    'change:zIndex': ReactOpenlayersEvent;
    'postcompose': ReactOpenlayersEvent;
    'precompose': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
    'render': ReactOpenlayersEvent;
}
export declare class HeatmapReact extends React.Component<HeatmapProps> {
    static contextType: React.Context<MapContextType>;
    layer: Heatmap;
    options: Options;
    events: HeatmapEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: HeatmapProps): void;
    componentWillUnmount(): void;
}
