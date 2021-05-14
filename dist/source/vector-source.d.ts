import * as React from 'react';
import VectorSource, { Options } from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import Collection from 'ol/Collection';
import { SourceType } from '.';
import { VectorLayerContextType } from '../layers/vector';
import { ReactOpenlayersEvents } from '../util';
export declare type VectorSourceContextType = VectorSourceReact | void;
export declare const VectorSourceContext: React.Context<VectorSourceContextType>;
export interface VectorSourceProps extends Options, SourceType<VectorSource> {
}
export interface VectorSourceEvents extends ReactOpenlayersEvents {
}
export declare class VectorSourceReact extends React.Component<VectorSourceProps> {
    static contextType: React.Context<VectorLayerContextType>;
    source: VectorSource;
    features: Feature<Geometry>[] | Collection<Feature<Geometry>>;
    options: Options;
    events: VectorSourceEvents;
    constructor(props: VectorSourceProps);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: VectorSourceProps): void;
    componentWillUnmount(): void;
}
