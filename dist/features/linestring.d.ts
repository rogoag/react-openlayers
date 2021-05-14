import { FeatureReact, FeatureProps } from './feature';
import { LineString } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
export interface LineStringProps extends FeatureProps {
    coordinates: Coordinate[] | number[];
}
export declare class LineStringReact extends FeatureReact<LineStringProps> {
    feature: Feature;
    geometry: LineString;
    constructor(props: LineStringProps);
    componentWillReceiveProps(nextProps: LineStringProps): void;
    render(): null;
}
