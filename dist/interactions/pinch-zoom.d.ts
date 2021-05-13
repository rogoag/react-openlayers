import * as React from 'react';
import PinchZoom, { Options } from 'ol/interaction/PinchZoom';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface PinchZoomProps extends Options, InteractionType<PinchZoom> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface PinchZoomEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class PinchZoomReact extends React.Component<PinchZoomProps> {
    static contextType: React.Context<MapContextType>;
    interaction: PinchZoom;
    options: Options;
    events: PinchZoomEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: PinchZoomProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
