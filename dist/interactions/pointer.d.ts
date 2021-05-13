import * as React from 'react';
import Pointer, { Options } from 'ol/interaction/Pointer';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface PointerProps extends Options, InteractionType<Pointer> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface PointerEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class PointerReact extends React.Component<PointerProps> {
    static contextType: React.Context<MapContextType>;
    interaction: Pointer;
    options: Options;
    events: PointerEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: PointerProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
