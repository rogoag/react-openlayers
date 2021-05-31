import * as React from 'react';
import Tile from 'ol/layer/Tile';
import { LayerType } from '.';
import { MapContextType } from '../map';
import { Omit, ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
import { Options } from 'ol/layer/BaseTile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/osm';
export declare type TileLayerContextType = TileReact | void;
export declare const TileLayerContext: React.Context<TileLayerContextType>;
export interface TileProps extends Omit<Options, 'source'>, LayerType<Tile> {
    source?: Options['source'];
    onChange?: ReactOpenlayersEvent;
    onChangeExtent?: ReactOpenlayersEvent;
    onChangeMinResolution?: ReactOpenlayersEvent;
    onChangeMaxResolution?: ReactOpenlayersEvent;
    onChangeOpacity?: ReactOpenlayersEvent;
    onChangePreload?: ReactOpenlayersEvent;
    onChangeSource?: ReactOpenlayersEvent;
    onChangeUseInterimTilesOnError?: ReactOpenlayersEvent;
    onChangeVisible?: ReactOpenlayersEvent;
    onChangeZIndex?: ReactOpenlayersEvent;
    onPostcompose?: ReactOpenlayersEvent;
    onPrecompose?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
    onRender?: ReactOpenlayersEvent;
}
export interface TileEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:extent': ReactOpenlayersEvent;
    'change:maxResolution': ReactOpenlayersEvent;
    'change:minResolution': ReactOpenlayersEvent;
    'change:opacity': ReactOpenlayersEvent;
    'change:preload': ReactOpenlayersEvent;
    'change:source': ReactOpenlayersEvent;
    'change:useInterimTilesOnError': ReactOpenlayersEvent;
    'change:visible': ReactOpenlayersEvent;
    'change:zIndex': ReactOpenlayersEvent;
    'postcompose': ReactOpenlayersEvent;
    'precompose': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
    'render': ReactOpenlayersEvent;
}
export declare class TileReact extends React.Component<TileProps> {
    static contextType: React.Context<MapContextType>;
    layer?: Tile;
    source?: XYZ | OSM;
    options: Options;
    events: TileEvents;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: TileProps): void;
    componentWillUnmount(): void;
}
