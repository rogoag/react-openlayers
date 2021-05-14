import * as React from 'react';
import XYZ, { Options } from 'ol/source/XYZ';
import { SourceType } from '.';
import { TileLayerContextType } from '../layers/tile';
import { ReactOpenlayersEvents } from '../util';
export interface XYZProps extends Options, SourceType<XYZ> {
}
export interface XYZEvents extends ReactOpenlayersEvents {
}
export declare class XYZReact extends React.Component<XYZProps> {
    static contextType: React.Context<TileLayerContextType>;
    source: XYZ;
    options: Options;
    events: XYZEvents;
    constructor(props: XYZProps);
    render(): null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: XYZProps): void;
    componentWillUnmount(): void;
}
