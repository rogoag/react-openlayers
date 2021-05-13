import * as React from 'react';
import Rotate, { Options } from 'ol/control/Rotate';
import { ControlType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface RotateProps extends Options, ControlType<Rotate> {
    onChange?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface RotateEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class RotateReact extends React.Component<RotateProps> {
    static contextType: React.Context<MapContextType>;
    control: Rotate;
    options: Options;
    events: RotateEvents;
    render(): null;
    componentDidMount(): void;
}
