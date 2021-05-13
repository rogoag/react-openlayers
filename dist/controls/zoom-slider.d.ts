import * as React from 'react';
import ZoomSlider, { Options } from 'ol/control/ZoomSlider';
import { ControlType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface ZoomSliderProps extends Options, ControlType<ZoomSlider> {
    onChange?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface ZoomSliderEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class ZoomSliderReact extends React.Component<ZoomSliderProps> {
    static contextType: React.Context<MapContextType>;
    control: ZoomSlider;
    options: Options;
    events: ZoomSliderEvents;
    render(): null;
    componentDidMount(): void;
}
