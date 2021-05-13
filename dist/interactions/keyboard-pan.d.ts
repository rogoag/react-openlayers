import * as React from 'react';
import KeyboardPan, { Options } from 'ol/interaction/KeyboardPan';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface KeyboardPanProps extends Options, InteractionType<KeyboardPan> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface KeyboardPanEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class KeyboardPanReact extends React.Component<KeyboardPanProps> {
    static contextType: React.Context<MapContextType>;
    interaction: KeyboardPan;
    options: Options;
    events: KeyboardPanEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: KeyboardPanProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
