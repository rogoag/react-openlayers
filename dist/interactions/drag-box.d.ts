import * as React from 'react';
import DragBox, { DragBoxEvent, Options } from 'ol/interaction/DragBox';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface DragBoxProps extends Options, InteractionType<DragBox> {
    onBoxdrag?: ReactOpenlayersEvent<DragBoxEvent>;
    onBoxend?: ReactOpenlayersEvent<DragBoxEvent>;
    onBoxstart?: ReactOpenlayersEvent<DragBoxEvent>;
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface DragBoxEvents extends ReactOpenlayersEvents {
    'boxdrag': ReactOpenlayersEvent<DragBoxEvent>;
    'boxend': ReactOpenlayersEvent<DragBoxEvent>;
    'boxstart': ReactOpenlayersEvent<DragBoxEvent>;
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class DragBoxReact extends React.Component<DragBoxProps> {
    static contextType: React.Context<MapContextType>;
    interaction: DragBox;
    options: Options;
    events: DragBoxEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: DragBoxProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
