import * as React from 'react';
import DragAndDrop, { Options, DragAndDropEvent } from 'ol/interaction/DragAndDrop';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface DragAndDropProps extends Options, InteractionType<DragAndDrop> {
    onAddfeatures?: ReactOpenlayersEvent<DragAndDropEvent>;
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface DragAndDropEvents extends ReactOpenlayersEvents {
    'addfeatures': ReactOpenlayersEvent<DragAndDropEvent>;
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class DragAndDropReact extends React.Component<DragAndDropProps> {
    static contextType: React.Context<MapContextType>;
    interaction: DragAndDrop;
    options: Options;
    events: DragAndDropEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: DragAndDropProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
