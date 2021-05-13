import * as React from 'react';
import DragPan, { Options } from 'ol/interaction/DragPan';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface DragPanProps extends Options, InteractionType<DragPan> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface DragPanEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class DragPanReact extends React.Component<DragPanProps> {
    static contextType: React.Context<MapContextType>;
    interaction: DragPan;
    options: DragPanProps;
    events: DragPanEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: DragPanProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
