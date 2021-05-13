import * as React from 'react';
import Image from 'ol/layer/Image';
import { LayerType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
import { Options } from 'ol/layer/BaseImage';
export interface ImageProps extends Options, LayerType<Image> {
    zIndex?: number;
    onChange?: ReactOpenlayersEvent;
    onChangeExtent?: ReactOpenlayersEvent;
    onChangeGradient?: ReactOpenlayersEvent;
    onChangeMaxResolution?: ReactOpenlayersEvent;
    onChangeMinResolution?: ReactOpenlayersEvent;
    onChangeOpacity?: ReactOpenlayersEvent;
    onChangeSource?: ReactOpenlayersEvent;
    onChangeVisible?: ReactOpenlayersEvent;
    onChangeZIndex?: ReactOpenlayersEvent;
    onPostcompose?: ReactOpenlayersEvent;
    onPrecompose?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
    onRender?: ReactOpenlayersEvent;
}
export interface ImageEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:extent': ReactOpenlayersEvent;
    'change:gradient': ReactOpenlayersEvent;
    'change:maxResolution': ReactOpenlayersEvent;
    'change:minResolution': ReactOpenlayersEvent;
    'change:opacity': ReactOpenlayersEvent;
    'change:source': ReactOpenlayersEvent;
    'change:visible': ReactOpenlayersEvent;
    'change:zIndex': ReactOpenlayersEvent;
    'postcompose': ReactOpenlayersEvent;
    'precompose': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
    'render': ReactOpenlayersEvent;
}
export declare class ImageReact extends React.Component<ImageProps> {
    static contextType: React.Context<MapContextType>;
    layer: Image;
    options: Options;
    events: ImageEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: ImageProps): void;
    componentWillUnmount(): void;
}
