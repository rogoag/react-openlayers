import * as React from 'react';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import Collection from 'ol/Collection';
import { AttributionLike } from 'ol/source/Source';
import { SourceType } from '.';
import { VectorLayerContextType } from '../layers/vector';
export declare type VectorSourceContextType = VectorSourceReact | void;
export declare const VectorSourceContext: React.Context<VectorSourceContextType>;
export interface VectorSourceProps extends SourceType<VectorSource> {
    attributions?: AttributionLike;
    url?: string;
    useSpatialIndex?: boolean;
    wrapX?: boolean;
}
export declare class VectorSourceReact extends React.Component<VectorSourceProps> {
    static contextType: React.Context<VectorLayerContextType>;
    source: VectorSource;
    features: Feature<Geometry>[] | Collection<Feature<Geometry>>;
    constructor(props: VectorSourceProps);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: VectorSourceProps): void;
    componentWillUnmount(): void;
}
