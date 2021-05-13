import * as React from 'react';
import Attribution, { Options } from 'ol/control/Attribution';
import { ControlType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface AttributionProps extends Options, ControlType<Attribution> {
    onChange: ReactOpenlayersEvent;
    onPropertychange: ReactOpenlayersEvent;
}
export interface AttributionEvents extends ReactOpenlayersEvents {
    change?: ReactOpenlayersEvent;
    propertychange?: ReactOpenlayersEvent;
}
export declare class AttributionReact extends React.Component<AttributionProps> {
    static contextType: React.Context<MapContextType>;
    control: Attribution;
    options: Options;
    events: AttributionEvents;
    render(): null;
    componentDidMount(): void;
}
