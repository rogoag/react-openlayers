import * as React from 'react';

import Draw, { Options } from 'ol/interaction/Draw';
import GeometryType from 'ol/geom/GeometryType';

import { InteractionType } from '.';
import { VectorSourceContext, VectorSourceContextType } from '../source/vector-source';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import CircleStyle from 'ol/style/circle';
import Stroke from 'ol/style/Stroke';

export interface StyleOptions {
  pointColor?: string | Array<number>,
  linestringColor?: string | Array<number>,
  polygonColor?: string | Array<number>
}

export interface DrawProps extends Options, InteractionType<Draw> {
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onDrawend?: ReactOpenlayersEvent
  onDrawstart?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent,
  styleOptions?: StyleOptions
}

export interface DrawEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'drawend': ReactOpenlayersEvent
  'drawstart': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
}

export class DrawReact extends React.Component<DrawProps> {
  public static contextType: React.Context<VectorSourceContextType> = VectorSourceContext;

  public interaction: Draw;

  public POLYGON_STYLE: Style = new Style();

  public POINT_STYLE: Style = new Style();

  public LINESTRING_STYLE = new Style();

  public options: Options = {
    clickTolerance: undefined,
    features: undefined,
    snapTolerance: undefined,
    type: GeometryType.POINT,
    maxPoints: undefined,
    minPoints: undefined,
    finishCondition: undefined,
    style: undefined,
    geometryFunction: undefined,
    geometryName: undefined,
    condition: undefined,
    freehand: undefined,
    freehandCondition: undefined,
    wrapX: undefined
  };

  public events: DrawEvents = {
    'change': undefined,
    'change:active': undefined,
    'drawend': undefined,
    'drawstart': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<Options, DrawProps>(this.options, this.props);
    this.interaction = new Draw({...options, style: this.genStyle.bind(this), source: this.context.source});
    this.context.context.context.interactions.push(this.interaction);

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: DrawProps) {
    if (nextProps !== this.props) {
      this.context.context.context.interactions.remove(this.interaction);
      const options = Util.getOptions<Options, DrawProps>(this.options, nextProps);
      this.interaction = new Draw({...options, style: this.genStyle.bind(this), source: this.context.source});
      this.context.context.context.interactions.push(this.interaction);

      this.initInteraction(nextProps);

      const olEvents = Util.getEvents(this.events, this.props);
      Object.keys(olEvents).forEach((eventName: string) => {
        this.interaction.on(eventName, olEvents[eventName]);
      })
    }
  }

  public componentWillUnmount() {
    this.context.context.context.interactions.remove(this.interaction);
  }

  private initInteraction(props: DrawProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }

  private genStyle(feature: any): Style | undefined {
    if(feature.getGeometry().getType() === GeometryType.POLYGON && this.props.styleOptions && this.props.styleOptions.polygonColor) {
      this.POLYGON_STYLE.setFill(new Fill({color: this.props.styleOptions.polygonColor}));
      return this.POLYGON_STYLE;
    } else if(feature.getGeometry().getType() === GeometryType.POINT && this.props.styleOptions && this.props.styleOptions.pointColor) {
      this.POINT_STYLE.setImage(new CircleStyle({fill: new Fill({color: this.props.styleOptions.pointColor}), radius: 6, stroke: new Stroke({width: 2, color: 'white'})}));
      return this.POINT_STYLE;
    } else if(feature.getGeometry().getType() === GeometryType.LINE_STRING && this.props.styleOptions && this.props.styleOptions.polygonColor) {
      this.LINESTRING_STYLE.setStroke(new Stroke({ color: this.props.styleOptions.linestringColor, width: 2 }));
      return this.LINESTRING_STYLE;
    } else {
      return undefined;
    }
  }

}