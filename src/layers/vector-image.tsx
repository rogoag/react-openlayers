// React
import * as React from 'react';

// OpenLayers
import VectorImageLayer from 'ol/layer/VectorImage';

// react-openlayers
import { LayerType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
import { Options } from 'ol/layer/BaseVector';
import VectorSource from 'ol/source/Vector';
import { VectorLayerContext } from './vector';

export interface VectorProps extends Options<any>, LayerType<VectorImageLayer<any>> {
  onChange?: ReactOpenlayersEvent
  onChangeExtent?: ReactOpenlayersEvent
  onChangeMinResolution?: ReactOpenlayersEvent
  onChangeMaxResolution?: ReactOpenlayersEvent
  onChangeOpacity?: ReactOpenlayersEvent
  onChangePreload?: ReactOpenlayersEvent
  onChangeSource?: ReactOpenlayersEvent
  onChangeVisible?: ReactOpenlayersEvent
  onChangeZIndex?: ReactOpenlayersEvent
  onPostcompose?: ReactOpenlayersEvent
  onPrecompose?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
  onRender?: ReactOpenlayersEvent
};

export interface VectorEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:extent': ReactOpenlayersEvent
  'change:maxResolution': ReactOpenlayersEvent
  'change:minResolution': ReactOpenlayersEvent
  'change:opacity': ReactOpenlayersEvent
  'change:preload': ReactOpenlayersEvent
  'change:source': ReactOpenlayersEvent
  'change:visible': ReactOpenlayersEvent
  'change:zIndex': ReactOpenlayersEvent
  'postcompose': ReactOpenlayersEvent
  'precompose': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
  'render': ReactOpenlayersEvent
}

export class VectorImage extends React.Component<VectorProps> {
  public static contextType: React.Context<MapContextType> = MapContext;
  public layer?: VectorImageLayer<any>;
  public source?: VectorSource;
  public pointStyleFunc?: Function;
  public polygonStyleFunc?: Function;
  public multiPolygonStyleFunc?: Function;
  public linestringStyleFunc?: Function;

  // Default options
  public options: Options<any> = {

  }

  public events: VectorEvents = {
    'change': undefined,
    'change:extent': undefined,
    'change:maxResolution': undefined,
    'change:minResolution': undefined,
    'change:opacity': undefined,
    'change:preload': undefined,
    'change:source': undefined,
    'change:visible': undefined,
    'change:zIndex': undefined,
    'postcompose': undefined,
    'precompose': undefined,
    'propertychange': undefined,
    'render': undefined
  };

  public render() {
    return (
      <VectorLayerContext.Provider value={this}>
        {this.props.children}
      </VectorLayerContext.Provider>
    );
  }

  public componentDidMount() {
    const options = Util.getOptions(this.options, this.props);
    this.layer = new VectorImageLayer({...options, source: this.source});
    this.context.layers.push(this.layer);
    if (this.props.zIndex !== undefined || this.props.zIndex !== undefined) {
      // @ts-ignore
      this.layer.setZIndex(this.props.zIndex);
    }
    if (this.props.layerRef) this.props.layerRef(this.layer);

    const olEvents = Util.getEvents<VectorEvents, VectorProps>(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      // @ts-ignore
      this.layer && this.layer.on(eventName, olEvents[eventName]);
    });
  }
  

  public componentWillReceiveProps(nextProps: VectorProps) {
    const options = Util.getOptions<Options<any>, VectorProps>(this.options, this.props);

    // Updating options first
    Object.keys(options).forEach((option: string) => {
      if (options[option] === nextProps[option]) return;
      const newVal = nextProps[option];
      if(this.layer) {
        switch (option) {
          case 'renderOrder': this.layer.set('renderOrder', newVal); break;
          case 'renderBuffer': this.layer.set('renderBuffer', newVal); break;
          case 'extent': this.layer.setExtent(newVal); break;
          case 'minResolution': this.layer.setMinResolution(newVal); break;
          case 'maxResolution': this.layer.setMaxResolution(newVal); break;
          case 'opacity': this.layer.setOpacity(newVal); break;
          case 'source': this.layer.setSource(newVal); break;
          case 'style': this.layer.setStyle(newVal); break;
          case 'updateWhileAnimating': this.layer.set('updateWhileAnimating', newVal); break;
          case 'updateWhileInteracting': this.layer.set('updateWhileInteracting', newVal); break;
          case 'visible': this.layer.setVisible(newVal); break;
          case 'zIndex': this.layer.setZIndex(newVal); break;
          default:
        }
      }
    });

    if (nextProps.layerRef && nextProps.layerRef !== this.props.layerRef) {
      if(this.layer) nextProps.layerRef(this.layer);
    }

    // Then update events
    const oldEvents = Util.getEvents(this.events, this.props);
    const newEvents = Util.getEvents(this.events, nextProps);
    Object.keys(this.events).forEach((eventName: string) => {
      // @ts-ignore
      if (oldEvents[eventName] && this.layer) this.layer.un(eventName, oldEvents[eventName]);
      // @ts-ignore
      if (newEvents[eventName] && this.layer) this.layer.on(eventName, newEvents[eventName]);
    })
  }

  public componentWillUnmount() {
    if(this.layer) {
      this.context.layers.remove(this.layer);
      this.layer.setStyle(null);
      this.layer.dispose();
      const renderer = this.layer.getRenderer();
      if (renderer) renderer.dispose();
    }

    if(this.source) {
      this.source.dispose();
    }

    this.layer = undefined;
    this.source = undefined;
  }
}
