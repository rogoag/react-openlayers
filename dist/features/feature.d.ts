import * as React from 'react';
import { Polygon, LineString, LinearRing, Point, MultiPolygon, MultiPoint, Circle, MultiLineString } from 'ol/geom';
import { VectorSourceContextType } from '../source/vector-source';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Fill, { Options as FillOptions } from 'ol/style/Fill';
import Stroke, { Options as StrokeOptions } from 'ol/style/Stroke';
import { Options as IconOptions } from 'ol/style/icon';
import { Options as TextOptions } from 'ol/style/Text';
import { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
interface CircleOptions {
    fillOptions?: FillOptions | Fill;
    radius: number;
    strokeOptions?: StrokeOptions | Stroke;
    displacement?: number[];
}
export interface FeatureEvents extends ReactOpenlayersEvents {
    'change:geometry': ReactOpenlayersEvent;
    'change': ReactOpenlayersEvent;
    'propertychange': ReactOpenlayersEvent;
}
export interface FeatureProps {
    onChange?: ReactOpenlayersEvent;
    onChangeGeometry?: ReactOpenlayersEvent;
    onPropertyChange?: ReactOpenlayersEvent;
    fillOptions?: FillOptions;
    strokeOptions?: StrokeOptions;
    iconOptions?: IconOptions;
    textOptions?: TextOptions;
    circleOptions?: CircleOptions;
    zIndex?: number;
    id?: string;
    properties?: {
        [key: string]: any;
    };
}
export declare class FeatureReact<T extends FeatureProps> extends React.Component<T, {}> {
    static contextType: React.Context<VectorSourceContextType>;
    feature: Feature;
    geometry: Polygon | LineString | LinearRing | Point | MultiPolygon | MultiPoint | Circle | MultiLineString;
    style: Style;
    events: FeatureEvents;
    updateFill(fillOptions: FillOptions): void;
    updateStroke(strokeOptions: StrokeOptions): void;
    updateIcon(iconOptions: IconOptions): void;
    updateText(textOptions: TextOptions): void;
    updateCircle(circleOptions: CircleOptions): void;
    updateZindex(zIndex: number): void;
    updateStyle(props: FeatureProps): void;
    componentDidMount(): void;
    handleStyleUpdates(prop: string, nextProps: FeatureProps): void;
    componentWillUnmount(): void;
    render(): null;
}
export {};
