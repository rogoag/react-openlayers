import * as React from 'react';
import Modify, { Options } from 'ol/interaction/Modify';
import { InteractionType } from '.';
import { VectorSourceContextType } from '../source/vector-source';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface ModifyProps extends Options, InteractionType<Modify> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onModifyend?: ReactOpenlayersEvent;
    onModifystart?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface ModifyEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'modifyend': ReactOpenlayersEvent;
    'modifystart': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class ModifyReact extends React.Component<ModifyProps> {
    static contextType: React.Context<VectorSourceContextType>;
    interaction: Modify;
    options: Options;
    events: ModifyEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: ModifyProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
