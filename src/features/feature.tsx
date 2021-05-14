import * as React from 'react';
import { Polygon, LineString, LinearRing, Point, MultiPolygon, MultiPoint, Circle, MultiLineString } from 'ol/geom';
import { VectorSourceContextType, VectorSourceContext } from '../source/vector-source';
import Feature from 'ol/Feature';
import Style, { Options as StyleOptions } from 'ol/style/Style';
import Fill, { Options as FillOptions } from 'ol/style/Fill';
import Stroke, { Options as StrokeOptions } from 'ol/style/Stroke';
import Icon, { Options as IconOptions } from 'ol/style/icon';
import CircleStyle, { Options as CircleOptions } from 'ol/style/circle';
import Text, { Options as TextOptions } from 'ol/style/Text';


export interface FeatureProps {
  fillOptions?: FillOptions,
  strokeOptions?: StrokeOptions,
  iconOptions?: IconOptions,
  textOptions?: TextOptions,
  circleOptions?: CircleOptions,
}

export class FeatureReact<T extends FeatureProps> extends React.Component<T, {}> {
  public static contextType: React.Context<VectorSourceContextType> = VectorSourceContext;

  public feature: Feature;
  public geometry: Polygon | LineString | LinearRing | Point | MultiPolygon | MultiPoint | Circle | MultiLineString;
  public style: Style;
  public fill: Fill | undefined;
  public stroke: Stroke | undefined;
  public icon: Icon | undefined;
  public text: Text | undefined;
  public circle: CircleStyle | undefined;

  createStyle(props: FeatureProps): void {
    const styleParams: StyleOptions = {};
    if(props.fillOptions && !props.circleOptions) {
      styleParams.fill = new Fill(props.fillOptions);
    }
    if(props.strokeOptions && !props.circleOptions) {
      styleParams.stroke = new Stroke(props.strokeOptions);
    }
    if(props.circleOptions && props.fillOptions) {
      props.circleOptions.fill = new Fill(props.fillOptions)
      props.circleOptions.stroke = new Stroke(props.strokeOptions);
      styleParams.image = new CircleStyle(props.circleOptions);
    }
    if(props.textOptions) {
      styleParams.text = new Text(props.textOptions);
    }
    if(props.iconOptions) {
      styleParams.image = new Icon(props.iconOptions);
    }
    this.style = new Style(styleParams);
  }

  public componentDidMount() {
    console.log(this.context)
    this.feature = new Feature({geometry: this.geometry});
    this.createStyle(this.props);
    this.feature.setStyle(this.style);
    this.context.features.push(this.feature);
    console.log(this.feature)
    console.log(this.context.features)
  }

  public componentWillReceiveProps(nextProps: FeatureProps) {
    this.createStyle(nextProps)
  }

  public componentWillUnmount() {
      console.log('HUH?', this.feature)
      this.context.features.remove(this.feature);
  }

  public render() {
    return (
        null
    );
  }
}
