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
import { asArray, asString } from 'ol/color';

interface TextOptionsReact extends TextOptions {
  fillOptions?: FillOptions,
  strokeOptions?: StrokeOptions
}

/* This is a bit hacky */
interface CircleOptions {
  fillOptions?: FillOptions;
  fill?: Fill;
  blinking?: boolean;
  radius: number;
  strokeOptions?: StrokeOptions;
  stroke?: Stroke;
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
  hideAtZoom?: number,
  iconOptions?: IconOptions,
  textOptions?: TextOptionsReact,
  circleOptions?: CircleOptions,
  zIndex?: number,
  id?: string,
  properties?: { [key: string]: any },
  hideTextZoom?: number,
  blinking?: boolean
}

export class FeatureReact<T extends FeatureProps> extends React.Component<T, {}> {
  public static contextType: React.Context<VectorSourceContextType> = VectorSourceContext;

  public feature?: Feature;
  public geometry?: Polygon | LineString | LinearRing | Point | MultiPolygon | MultiPoint | Circle | MultiLineString;
  public style?: Style;
  public active: Boolean;
  public currentOpacity: number = 1;
  public blinkingInterval: number | undefined = undefined;
  public subtracting: boolean = true;

  public events: FeatureEvents = {
    'change:geometry': undefined,
    'change': undefined,
    'propertychange': undefined
  };

  constructor(props: any) {
    super(props);

    this.updateBlinking = this.updateBlinking.bind(this);
    this.blink = this.blink.bind(this);
  }

  blink() {
    if(this.style && this.feature) {
      if(this.props.circleOptions) {
        const circleStyle = this.style.getImage() as CircleStyle;
        const fill = circleStyle.getFill();
        const colorString = fill.getColor().toString();
        const colorArray = asArray(colorString).slice();
        const strokeColor = circleStyle.getStroke();
        const strokeColorString = strokeColor.getColor().toString();
        const strokeArray = asArray(strokeColorString).slice();
        if(this.subtracting) {
          colorArray[3] -= .05;
          strokeArray[3] -= .05;
        } else {
          colorArray[3] += .05;
          strokeArray[3] += .05;
        }
        fill.setColor(asString(colorArray));
        if(colorArray[3] <= .2) {
          this.subtracting = false;
        }
        if(colorArray[3] >= 1) {
          this.subtracting = true;
        }
        const newCircleStyle = new CircleStyle({...this.props.circleOptions, fill});
        this.style.setImage(newCircleStyle);
        this.feature.changed();
      }
    }
  }

  startBlinkInterval() {
    window.clearInterval(this.blinkingInterval);
    this.blinkingInterval = window.setInterval(this.blink, 100);
  }

  updateBlinking(blinking: boolean) {
    if(this.blinkingInterval === undefined && blinking) {
      this.startBlinkInterval();
    } else if(this.blinkingInterval !== undefined && !blinking) {
      window.clearInterval(this.blinkingInterval);
      this.blinkingInterval = undefined;
    }
  }

  updateFill(fillOptions: FillOptions) {
    this.style && this.style.setFill(new Fill(fillOptions));
  }

  updateStroke(strokeOptions: StrokeOptions) {
    this.style && this.style.setStroke(new Stroke(strokeOptions));
  }

  updateIcon(iconOptions: IconOptions) {
    this.style && this.style.setImage(new Icon(iconOptions));
  }

  updateText(textOptions: TextOptionsReact) {
    this.style && this.style.setText(new Text({...textOptions, fill: new Fill(textOptions.fillOptions), stroke: new Stroke(textOptions.strokeOptions)}));
  }

  updateCircle(circleOptions: CircleOptions) {
    if(circleOptions.fillOptions) {
      circleOptions.fill = new Fill(circleOptions.fillOptions);
    }
    if(circleOptions.strokeOptions) {
      circleOptions.stroke = new Stroke(circleOptions.strokeOptions);
    }
    this.style && this.style.setImage(
      new CircleStyle({
        radius: circleOptions.radius, 
        fill: circleOptions.fill, 
        stroke: circleOptions.stroke, 
        displacement: circleOptions.displacement,
      })
    );

    this.updateBlinking(Boolean(circleOptions.blinking));
  }

  updateZindex(zIndex: number) {
    this.style && this.style.setZIndex(zIndex);
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
    const view = this.context.context.context.map.getView();
    const zoom = view.getZoom();
    if(this.props.hideAtZoom && zoom < this.props.hideAtZoom) {
      this.style = new Style();
      this.active = false;
    }
    
    if(!this.active && this.props.hideAtZoom && zoom > this.props.hideAtZoom) {
      this.updateStyle(this.props);
      this.active = true;
    }
    if(this.props.hideTextZoom && this.style && this.active) {
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
    this.active = true;
    this.updateStyle(this.props);
    this.feature.setStyle(this.styleFunction.bind(this));
    if(this.props.properties) {
      this.feature.setProperties(this.props.properties as { [key: string]: any });
    }
    this.context.features.push(this.feature);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.feature && this.feature.on(eventName, olEvents[eventName]);
    });
  }

  handleStyleUpdates(prop: string, nextProps: FeatureProps) {
    if(JSON.stringify(nextProps[prop]) === JSON.stringify(this.props[prop])) return;
    const newVal = nextProps[prop];
    if(this.feature) {
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
  }

  public componentWillUnmount() {
      this.context.features.remove(this.feature);
      window.clearInterval(this.blinkingInterval);
      this.blinkingInterval = undefined;
      this.currentOpacity = 1;
      this.feature = undefined;
      this.style = undefined;
      this.geometry = undefined;
  }

  public render() {
    return (
        null
    );
  }
}
