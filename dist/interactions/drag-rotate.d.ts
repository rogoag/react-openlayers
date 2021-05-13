import * as React from 'react';
import DragRotate, { Options } from 'ol/interaction/DragRotate';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface DragRotateProps extends Options, InteractionType<DragRotate> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onpropertychange?: ReactOpenlayersEvent;
}
export interface DragRotateEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class DragRotateReact extends React.Component<DragRotateProps> {
    static contextType: React.Context<MapContextType>;
    interaction: DragRotate;
    options: DragRotateProps;
    events: DragRotateEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: DragRotateProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
