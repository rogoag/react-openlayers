import * as React from 'react';
import DoubleClickZoom, { Options } from 'ol/interaction/DoubleClickZoom';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface DoubleClickZoomProps extends Options, InteractionType<DoubleClickZoom> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface DoubleClickZoomEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class DoubleClickZoomReact extends React.Component<DoubleClickZoomProps> {
    static contextType: React.Context<MapContextType>;
    interaction: DoubleClickZoom;
    options: Options;
    events: DoubleClickZoomEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: DoubleClickZoomProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
