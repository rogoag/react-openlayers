import * as React from 'react';
import { Polygon, LineString, LinearRing, Point, MultiPolygon, MultiPoint, Circle, MultiLineString } from 'ol/geom';
import { VectorSourceContextType, VectorSourceContext } from '../source/vector-source';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
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
  zIndex?: number,
  id?: string,
}

export class FeatureReact<T extends FeatureProps> extends React.Component<T, {}> {
  public static contextType: React.Context<VectorSourceContextType> = VectorSourceContext;

  public feature: Feature;
  public geometry: Polygon | LineString | LinearRing | Point | MultiPolygon | MultiPoint | Circle | MultiLineString;
  public style: Style;

  updateFill(fillOptions: FillOptions) {
    this.style.setFill(new Fill(fillOptions));
  }

  updateStroke(strokeOptions: StrokeOptions) {
    this.style.setStroke(new Stroke(strokeOptions));
  }

  updateIcon(iconOptions: IconOptions) {
    this.style.setImage(new Icon(iconOptions));
  }

  updateText(textOptions: TextOptions) {
    this.style.setText(new Text(textOptions));
  }

  updateCircle(circleOptions: CircleOptions) {
    this.style.setImage(new CircleStyle(circleOptions));
  }

  updateZindex(zIndex: number) {
    this.style.setZIndex(zIndex);
  }
  
  updateStyle(props: FeatureProps): void {
    if(props.fillOptions && !props.circleOptions) {
      this.updateFill(props.fillOptions);
    }
    if(props.strokeOptions && !props.circleOptions) {
      this.updateStroke(props.strokeOptions);
    }
    if(props.circleOptions && props.fillOptions) {
      props.circleOptions.fill = new Fill(props.fillOptions)
      props.circleOptions.stroke = new Stroke(props.strokeOptions);
      this.updateCircle(props.circleOptions);
    }
    if(props.textOptions) {
      this.updateText(props.textOptions);
    }
    if(props.iconOptions) {
      this.updateIcon(props.iconOptions);
    }
    if(props.zIndex) {
      this.updateZindex(props.zIndex);
    }
  }

  public componentDidMount() {
    this.feature = new Feature({geometry: this.geometry});
    if(this.props.id) {
      this.feature.setId(this.props.id);
    }
    this.style = new Style();
    this.updateStyle(this.props);
    this.feature.setStyle(this.style);
    this.context.features.push(this.feature);
  }

  handleStyleUpdates(prop: string, nextProps: FeatureProps) {
    if(JSON.stringify(nextProps[prop]) === JSON.stringify(this.props[prop])) return;
    const newVal = nextProps[prop];
    switch(prop) {
      case 'fillOptions': this.updateFill(newVal); break;
      case 'strokeOptions': this.updateStroke(newVal); break;
      case 'iconOptions': this.updateIcon(newVal); break;
      case 'textOptions': this.updateText(newVal); break;
      case 'circleOptions': this.updateCircle(newVal); break;
      case 'zIndex': this.updateZindex(newVal); break;
    }
    this.feature.changed();
  }

  public componentWillUnmount() {
      this.context.features.remove(this.feature);
  }

  public render() {
    return (
        null
    );
  }
}
