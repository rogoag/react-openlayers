import * as React from 'react';
import Translate, { Options } from 'ol/interaction/Translate';
import { InteractionType } from '.';
import { MapContextType } from '../map';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
export interface TranslateProps extends Options, InteractionType<Translate> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
    onTranslateend?: ReactOpenlayersEvent;
    onTranslatestart?: ReactOpenlayersEvent;
    onTranslating?: ReactOpenlayersEvent;
}
export interface TranslateEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
    'translateend': ReactOpenlayersEvent;
    'translatestart': ReactOpenlayersEvent;
    'translating': ReactOpenlayersEvent;
}
export declare class TranslateReact extends React.Component<TranslateProps> {
    static contextType: React.Context<MapContextType>;
    interaction: Translate;
    options: Options;
    events: TranslateEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: TranslateProps): void;
    componentWillUnmount(): void;
    private initInteraction;
}
