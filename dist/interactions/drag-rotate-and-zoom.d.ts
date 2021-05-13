import * as React from 'react';
import DragRotateAndZoom, { Options } from 'ol/interaction/DragRotateAndZoom';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface DragRotateAndZoomProps extends Options, InteractionType<DragRotateAndZoom> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface DragRotateAndZoomEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class DragRotateAndZoomReact extends React.Component<DragRotateAndZoomProps> {
    static contextType: React.Context<MapContextType>;
    interaction: DragRotateAndZoom;
    options: DragRotateAndZoomProps;
    events: DragRotateAndZoomEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: DragRotateAndZoomProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
