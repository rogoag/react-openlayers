import * as React from 'react';
import Zoom, { Options } from 'ol/control/Zoom';
import { ControlType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface ZoomProps extends Options, ControlType<Zoom> {
    onChange?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface ZoomPropsEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class ZoomReact extends React.Component<ZoomProps> {
    static contextType: React.Context<MapContextType>;
    control: Zoom;
    options: Options;
    events: ZoomPropsEvents;
    render(): null;
    componentDidMount(): void;
}
