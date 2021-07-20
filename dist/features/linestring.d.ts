import { FeatureReact, FeatureProps } from './feature';
import { LineString } from 'ol/geom';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
export interface LineStringProps extends FeatureProps {
    coordinates: Coordinate[] | number[];
    forceRefresh?: Boolean;
}
export declare class LineStringReact extends FeatureReact<LineStringProps> {
    feature: Feature;
    geometry: LineString;
    constructor(props: LineStringProps);
    shouldComponentUpdate(nextProps: LineStringProps): boolean;
    componentWillReceiveProps(nextProps: LineStringProps): void;
    render(): null;
}
