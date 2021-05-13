import * as React from 'react';
import PinchRotate, { Options } from 'ol/interaction/PinchRotate';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface PinchRotateProps extends Options, InteractionType<PinchRotate> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface PinchRotateEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class PinchRotateReact extends React.Component<PinchRotateProps> {
    static contextType: React.Context<MapContextType>;
    interaction: PinchRotate;
    options: Options;
    events: PinchRotateEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: PinchRotateProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
