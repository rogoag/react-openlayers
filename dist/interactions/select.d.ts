import * as React from 'react';
import Select, { Options, SelectEvent } from 'ol/interaction/Select';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface SelectProps extends Options, InteractionType<Select> {
    instance?: Select;
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
    onSelect?: ReactOpenlayersEvent<SelectEvent>;
}
export interface SelectEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
    'select': ReactOpenlayersEvent;
}
export declare class SelectReact extends React.Component<SelectProps> {
    static contextType: React.Context<MapContextType>;
    interaction: Select;
    options: Options;
    events: SelectEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: SelectProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
