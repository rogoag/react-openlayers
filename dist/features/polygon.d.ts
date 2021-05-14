import { FeatureReact, FeatureProps } from './feature';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
export interface PolygonProps extends FeatureProps {
    coordinates: Coordinate[][] | number[];
}
export declare class PolygonReact extends FeatureReact<PolygonProps> {
    feature: Feature;
    constructor(props: PolygonProps);
    render(): null;
}
