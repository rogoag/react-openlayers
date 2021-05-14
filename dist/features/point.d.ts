import { FeatureReact, FeatureProps } from './feature';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
export interface PointProps extends FeatureProps {
    coordinate: Coordinate;
}
export declare class PointReact extends FeatureReact<PointProps> {
    feature: Feature;
    constructor(props: PointProps);
    render(): null;
}
