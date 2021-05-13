import * as React from 'react';
import Snap, { Options } from 'ol/interaction/Snap';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface SnapProps extends Options, InteractionType<Snap> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface SnapEvent extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class SnapReact extends React.Component<SnapProps> {
    static contextType: React.Context<MapContextType>;
    interaction: Snap;
    options: Options;
    events: SnapEvent;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: SnapProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
