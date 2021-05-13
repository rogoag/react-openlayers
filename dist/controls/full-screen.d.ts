import * as React from 'react';
import FullScreen, { Options } from 'ol/control/FullScreen';
import { ControlType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface FullScreenProps extends Options, ControlType<FullScreen> {
    onchange?: ReactOpenlayersEvent;
    onpropertychange?: ReactOpenlayersEvent;
}
export interface FullScreenEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class FullScreenReact extends React.Component<FullScreenProps> {
    static contextType: React.Context<MapContextType>;
    control: FullScreen;
    options: Options;
    events: FullScreenEvents;
    render(): null;
    componentDidMount(): void;
}
