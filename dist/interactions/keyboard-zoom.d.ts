import * as React from 'react';
import KeyboardZoom, { Options } from 'ol/interaction/KeyboardZoom';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface KeyboardZoomProps extends Options, InteractionType<KeyboardZoom> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface KeyboardZoomEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class KeyboardZoomReact extends React.Component<KeyboardZoomProps> {
    static contextType: React.Context<MapContextType>;
    interaction: KeyboardZoom;
    options: Options;
    events: KeyboardZoomEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: KeyboardZoomProps): void;
    componentWillUnmount(): void;
    initInteraction(props: KeyboardZoomProps): void;
}
