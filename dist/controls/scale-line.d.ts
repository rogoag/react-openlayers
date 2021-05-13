import * as React from 'react';
import ScaleLine, { Options } from 'ol/control/ScaleLine';
import { ControlType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface ScaleLineProps extends Options, ControlType<ScaleLine> {
    onChange?: ReactOpenlayersEvent;
    onChangeUnits?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface ScaleLineEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:units': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class ScaleLineReact extends React.Component<ScaleLineProps> {
    static contextType: React.Context<MapContextType>;
    control: ScaleLine;
    options: Options;
    events: ScaleLineEvents;
    render(): null;
    componentDidMount(): void;
}
