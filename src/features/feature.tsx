import * as React from 'react';
import { Polygon, LineString, LinearRing, Point, MultiPolygon, MultiPoint, Circle, MultiLineString } from 'ol/geom';
import { VectorSourceContextType, VectorSourceContext } from '../source/vector-source';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Fill, { Options as FillOptions } from 'ol/style/Fill';
import Stroke, { Options as StrokeOptions } from 'ol/style/Stroke';
import Icon, { Options as IconOptions } from 'ol/style/icon';
import CircleStyle from 'ol/style/circle';
import Text, { Options as TextOptions } from 'ol/style/Text';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

interface TextOptionsReact extends TextOptions {
  fillOptions?: FillOptions,
  strokeOptions?: StrokeOptions
}

/* This is a bit hacky */
interface CircleOptions {
  fillOptions?: FillOptions | Fill;
  radius: number;
  strokeOptions?: StrokeOptions | Stroke;
  displacement?: number[];
}

export interface FeatureEvents extends ReactOpenlayersEvents {
  'change:geometry': ReactOpenlayersEvent,
  'change': ReactOpenlayersEvent,
  'propertychange': ReactOpenlayersEvent
};

export interface FeatureProps {
  onChange?: ReactOpenlayersEvent
  onChangeGeometry?: ReactOpenlayersEvent,
  onPropertyChange?: ReactOpenlayersEvent,
  fillOptions?: FillOptions,
  strokeOptions?: StrokeOptions,
  iconOptions?: IconOptions,
  textOptions?: TextOptionsReact,
  circleOptions?: CircleOptions,
  zIndex?: number,
  id?: string,
  properties?: { [key: string]: any },
  hideTextZoom?: number
}

export class FeatureReact<T extends FeatureProps> extends React.Component<T, {}> {
  public static contextType: React.Context<VectorSourceContextType> = VectorSourceContext;

  public feature: Feature;
  public geometry: Polygon | LineString | LinearRing | Point | MultiPolygon | MultiPoint | Circle | MultiLineString;
  public style: Style;

  public events: FeatureEvents = {
    'change:geometry': undefined,
    'change': undefined,
    'propertychange': undefined
  };

  updateFill(fillOptions: FillOptions) {
    this.style.setFill(new Fill(fillOptions));
  }

  updateStroke(strokeOptions: StrokeOptions) {
    this.style.setStroke(new Stroke(strokeOptions));
  }

  updateIcon(iconOptions: IconOptions) {
    this.style.setImage(new Icon(iconOptions));
  }

  updateText(textOptions: TextOptionsReact) {
    this.style.setText(new Text({...textOptions, fill: new Fill(textOptions.fillOptions), stroke: new Stroke(textOptions.strokeOptions)}));
  }

  updateCircle(circleOptions: CircleOptions) {
    if(circleOptions.fillOptions) {
      circleOptions.fillOptions = new Fill((circleOptions.fillOptions as FillOptions));
    }
    if(circleOptions.strokeOptions) {
      circleOptions.strokeOptions = new Stroke((circleOptions.strokeOptions as StrokeOptions));
    }
    this.style.setImage(
      new CircleStyle({
        radius: circleOptions.radius, 
        fill: circleOptions.fillOptions, 
        stroke: circleOptions.strokeOptions, 
        displacement: circleOptions.displacement
      })
    );
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
    if(props.circleOptions) {
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

  styleFunction() {
    if(this.props.hideTextZoom) {
      const view = this.context.context.context.map.getView();
      const zoom = view.getZoom();
      const text = this.style.getText();
      if(zoom > this.props.hideTextZoom && text.getScale() === 0) {
        this.style.getText().setScale(1);
      } else if(zoom < this.props.hideTextZoom) {
        this.style.getText().setScale(0);
      }
    }
    return this.style;
  }

  public componentDidMount() {
    this.feature = new Feature({geometry: this.geometry});
    if(this.props.id) {
      this.feature.setId(this.props.id);
    }
    this.style = new Style();
    this.updateStyle(this.props);
    this.feature.setStyle(this.styleFunction.bind(this));
    if(this.props.properties) {
      this.feature.setProperties(this.props.properties as { [key: string]: any });
    }
    this.context.features.push(this.feature);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.feature.on(eventName, olEvents[eventName]);
    });
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
      case 'properties': this.feature.setProperties(nextProps.properties as { [key: string]: any }); break;
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
