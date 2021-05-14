import { FeatureReact, FeatureProps } from './feature';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
export interface LineStringProps extends FeatureProps {
    coordinates: Coordinate[];
}
export declare class LineStringReact extends FeatureReact<LineStringProps> {
    feature: Feature;
    constructor(props: LineStringProps);
    render(): null;
}
