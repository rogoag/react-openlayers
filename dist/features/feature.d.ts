import * as React from 'react';
import { Polygon, LineString, LinearRing, Point, MultiPolygon, MultiPoint, Circle, MultiLineString } from 'ol/geom';
import { VectorSourceContextType } from '../source/vector-source';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import { Options as FillOptions } from 'ol/style/Fill';
import { Options as StrokeOptions } from 'ol/style/Stroke';
import { Options as IconOptions } from 'ol/style/icon';
import { Options as CircleOptions } from 'ol/style/circle';
import { Options as TextOptions } from 'ol/style/Text';
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
    updateFill(fillOptions: FillOptions): void;
    updateStroke(strokeOptions: StrokeOptions): void;
    updateIcon(iconOptions: IconOptions): void;
    updateText(textOptions: TextOptions): void;
    updateCircle(circleOptions: CircleOptions): void;
    updateStyle(props: FeatureProps): void;
    componentDidMount(): void;
    handleStyleUpdates(prop: string, nextProps: FeatureProps): void;
    componentWillUnmount(): void;
    render(): null;
}
