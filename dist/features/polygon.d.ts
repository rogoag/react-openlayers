import { FeatureReact, FeatureProps } from './feature';
import { Polygon } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
export interface PolygonProps extends FeatureProps {
    coordinates: Coordinate[][] | number[];
    forceRefresh?: Boolean;
}
export declare class PolygonReact extends FeatureReact<PolygonProps> {
    feature: Feature;
    geometry: Polygon;
    constructor(props: PolygonProps);
    shouldComponentUpdate(nextProps: PolygonProps): boolean;
    componentWillReceiveProps(nextProps: PolygonProps): void;
    render(): null;
}
