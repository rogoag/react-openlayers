import * as React from 'react';
import Extent from 'ol/interaction/Extent';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export declare type ExtentOptions = olFix.olx.interaction.ExtentOptions;
export interface ExtentProps extends ExtentOptions, InteractionType<Extent> {
    onEvent?: ReactOpenlayersEvent;
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
}
export interface ExtentEvents extends ReactOpenlayersEvents {
    'Event': ReactOpenlayersEvent;
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class ExtentReact extends React.Component<ExtentProps> {
    static contextType: React.Context<MapContextType>;
    interaction: Extent;
    options: ExtentOptions;
    events: ExtentEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: ExtentProps): void;
    componentWillUnmount(): void;
    initInteraction(props: ExtentProps): void;
}
