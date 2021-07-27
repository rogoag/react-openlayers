import * as React from 'react';
import olOverlay, { Options } from 'ol/Overlay';
import { OverlayType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface OverlayProps extends Options, OverlayType<olOverlay> {
    onChange?: ReactOpenlayersEvent;
    onChangeelement?: ReactOpenlayersEvent;
    onChangemap?: ReactOpenlayersEvent;
    onChangeoffset?: ReactOpenlayersEvent;
    onChangeposition?: ReactOpenlayersEvent;
    onChangepositioning?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface OverlayEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:element': ReactOpenlayersEvent;
    'change:map': ReactOpenlayersEvent;
    'change:offset': ReactOpenlayersEvent;
    'change:position': ReactOpenlayersEvent;
    'change:positioning': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class Overlay extends React.Component<OverlayProps> {
    static contextType: React.Context<MapContextType>;
    overlay: olOverlay;
    el: HTMLElement;
    divRef: any;
    options: Options;
    events: OverlayEvents;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
