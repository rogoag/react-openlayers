import * as React from 'react';
import Draw, { Options } from 'ol/interaction/Draw';
import { InteractionType } from '.';
import { VectorSourceContextType } from '../source/vector-source';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
import Style from 'ol/style/Style';
export interface StyleOptions {
    pointColor?: string | Array<number>;
    linestringColor?: string | Array<number>;
    polygonColor?: string | Array<number>;
}
export interface DrawProps extends Options, InteractionType<Draw> {
    onChange?: ReactOpenlayersEvent;
    onChangeActive?: ReactOpenlayersEvent;
    onDrawend?: ReactOpenlayersEvent;
    onDrawstart?: ReactOpenlayersEvent;
    onPropertychange?: ReactOpenlayersEvent;
    styleOptions?: StyleOptions;
}
export interface DrawEvents extends ReactOpenlayersEvents {
    'change': ReactOpenlayersEvent;
    'change:active': ReactOpenlayersEvent;
    'drawend': ReactOpenlayersEvent;
    'drawstart': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export declare class DrawReact extends React.Component<DrawProps> {
    static contextType: React.Context<VectorSourceContextType>;
    interaction: Draw;
    POLYGON_STYLE: Style;
    POINT_STYLE: Style;
    LINESTRING_STYLE: Style;
    options: Options;
    events: DrawEvents;
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: DrawProps): void;
    componentWillUnmount(): void;
    private initInteraction;
    private genStyle;
}
