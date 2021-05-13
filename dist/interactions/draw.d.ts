import * as React from 'react';
import Draw, { Options } from 'ol/interaction/Draw';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface DrawProps extends Options, InteractionType<Draw> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onDrawend?: ReactOpenlayersEvent;
    onDrawstart?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface DrawEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'drawend': ReactOpenlayersEvent;
    'drawstart': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class DrawReact extends React.Component<DrawProps> {
    static contextType: React.Context<MapContextType>;
    interaction: Draw;
    options: Options;
    events: DrawEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: DrawProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
