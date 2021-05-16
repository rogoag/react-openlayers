import { FeatureReact, FeatureProps } from './feature';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
export interface PointProps extends FeatureProps {
    coordinate: Coordinate;
}
export declare class PointReact extends FeatureReact<PointProps> {
    feature: Feature;
    geometry: Point;
    constructor(props: PointProps);
    componentWillReceiveProps(nextProps: PointProps): void;
    render(): null;
}