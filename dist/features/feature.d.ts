import * as React from 'react';
import { Polygon, LineString, LinearRing, Point, MultiPolygon, MultiPoint, Circle, MultiLineString } from 'ol/geom';
import { VectorSourceContextType } from '../source/vector-source';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Fill, { Options as FillOptions } from 'ol/style/Fill';
import Stroke, { Options as StrokeOptions } from 'ol/style/Stroke';
import Icon, { Options as IconOptions } from 'ol/style/icon';
import CircleStyle, { Options as CircleOptions } from 'ol/style/circle';
import Text, { Options as TextOptions } from 'ol/style/Text';
export interface FeatureProps {
    fillOptions?: FillOptions;
    strokeOptions?: StrokeOptions;
    iconOptions?: IconOptions;
    textOptions?: TextOptions;
    circleOptions?: CircleOptions;
}
export declare class FeatureReact<T extends FeatureProps> extends React.Component<T, {}> {
    static contextType: React.Context<VectorSourceContextType>;
    feature: Feature;
    geometry: Polygon | LineString | LinearRing | Point | MultiPolygon | MultiPoint | Circle | MultiLineString;
    style: Style;
    fill: Fill | undefined;
    stroke: Stroke | undefined;
    icon: Icon | undefined;
    text: Text | undefined;
    circle: CircleStyle | undefined;
    createStyle(props: FeatureProps): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: FeatureProps): void;
    componentWillUnmount(): void;
    render(): null;
}
