import { FeatureReact, FeatureProps } from './feature';
import { MultiPolygon, Polygon } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
export interface MultiPolygonProps extends FeatureProps {
    coordinates: (Coordinate[][] | Polygon)[];
}
export declare class MultiPolygonReact extends FeatureReact<MultiPolygonProps> {
    feature: Feature;
    geometry: MultiPolygon;
    constructor(props: MultiPolygonProps);
    componentWillReceiveProps(nextProps: MultiPolygonProps): void;
    render(): null;
}