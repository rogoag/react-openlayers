// React
import * as React from 'react';

// OpenLayers
import VectorLayer from 'ol/layer/Vector';

// react-openlayers
import { LayerType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
import { Options } from 'ol/layer/BaseVector';
import VectorSource from 'ol/source/Vector';


export type VectorLayerContextType = Vector | void;
export const VectorLayerContext = React.createContext<VectorLayerContextType>(undefined);

export interface VectorProps extends Options, LayerType<VectorLayer> {
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

export class Vector extends React.Component<VectorProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public layer?: VectorLayer;
  public source: VectorSource;

  // Default options
  public options: Options = {

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
    this.layer = new VectorLayer({...options, source: this.source});
    if (this.props.zIndex) {
      this.layer.setZIndex(this.props.zIndex);
    }
    this.context.layers.push(this.layer);

    if (this.props.layerRef) this.props.layerRef(this.layer);

    const olEvents = Util.getEvents<VectorEvents, VectorProps>(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      if(this.layer) this.layer.on(eventName, olEvents[eventName]);
    });
  }
  

  public componentWillReceiveProps(nextProps: VectorProps) {
    const options = Util.getOptions<Options, VectorProps>(this.options, this.props);

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
      if(this.layer) {
        if (oldEvents[eventName]) this.layer.un(eventName, oldEvents[eventName]);
        if (newEvents[eventName]) this.layer.on(eventName, newEvents[eventName]);
      }
    })
  }

  public componentWillUnmount() {
    console.log('removing vector layer from map', this.context.map);
    if(this.context.map) {
      this.context.map.removeLayer(this.layer);
    }
    this.layer = undefined;
  }
}