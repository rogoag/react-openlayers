import * as React from 'react';
import DragZoom, { Options } from 'ol/interaction/DragZoom';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface DragZoomProps extends Options, InteractionType<DragZoom> {
    onBoxdrag?: ReactOpenlayersEvent;
    onBoxend?: ReactOpenlayersEvent;
    onBoxstart?: ReactOpenlayersEvent;
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface DragZoomEvents extends ReactOpenlayersEvents {
    'boxdrag': ReactOpenlayersEvent;
    'boxend': ReactOpenlayersEvent;
    'boxstart': ReactOpenlayersEvent;
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class DragZoomReact extends React.Component<DragZoomProps> {
    static contextType: React.Context<MapContextType>;
    interaction: DragZoom;
    options: DragZoomProps;
    events: DragZoomEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: DragZoomProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
