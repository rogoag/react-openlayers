import * as React from 'react';
import OverviewMap, { Options } from 'ol/control/OverviewMap';
import { ControlType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface OverviewMapProps extends Options, ControlType<OverviewMap> {
    onChange?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface OverviewMapEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class OverviewMapReact extends React.Component<OverviewMapProps> {
    static contextType: React.Context<MapContextType>;
    control: OverviewMap;
    options: Options;
    events: OverviewMapEvents;
    render(): null;
    componentDidMount(): void;
}
