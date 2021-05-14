import { FeatureReact, FeatureProps } from './feature';
import { Polygon } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
export interface MultiPolygonProps extends FeatureProps {
    coordinates: (Coordinate[][] | Polygon)[];
}
export declare class MultiPolygonReact extends FeatureReact<MultiPolygonProps> {
    feature: Feature;
    constructor(props: MultiPolygonProps);
    render(): null;
}
