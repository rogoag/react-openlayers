import * as React from 'react';
import MouseWheelZoom, { Options } from 'ol/interaction/MouseWheelZoom';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface MouseWheelZoomProps extends Options, InteractionType<MouseWheelZoom> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface MouseWheelZoomEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class MouseWheelZoomReact extends React.Component<MouseWheelZoomProps> {
    static contextType: React.Context<MapContextType>;
    interaction: MouseWheelZoom;
    options: Options;
    events: MouseWheelZoomEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: MouseWheelZoomProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
