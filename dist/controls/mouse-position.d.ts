import * as React from 'react';
import MousePosition from 'ol/control/MousePosition';
import { ControlType } from '.';
import { MapContextType } from '../map';
import { Options } from 'ol/control/MousePosition';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface MousePositionProps extends Options, ControlType<MousePosition> {
    onChange?: ReactOpenlayersEvent;
    onChangeCoordinateFormat?: ReactOpenlayersEvent;
    onChangeProjection?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface MousePositionEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:coordinateFormat': ReactOpenlayersEvent;
    'change:projection': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class MousePositionReact extends React.Component<MousePositionProps> {
    static contextType: React.Context<MapContextType>;
    control: MousePosition;
    options: Options;
    events: MousePositionEvents;
    render(): null;
    componentDidMount(): void;
}
