import * as React from 'react';
import ZoomToExtent, { Options } from 'ol/control/ZoomToExtent';
import { ControlType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface ZoomToExtentProps extends Options, ControlType<ZoomToExtent> {
    onChange?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface ZoomToExtentEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class ZoomToExtentReact extends React.Component<ZoomToExtentProps> {
    static contextType: React.Context<MapContextType>;
    control: ZoomToExtent;
    options: Options;
    events: ZoomToExtentEvents;
    render(): null;
    componentDidMount(): void;
}
