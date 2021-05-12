import {HeatmapReact} from './heatmap';
import {ImageReact} from './image';
import {Layers} from './layers';
import {TileReact} from './tile';
import {Vector} from './vector';
import Layer from 'ol/layer/Layer';

export interface LayerType<T extends Layer> {
  layerRef?(layer:T):void
}

const layer = {
  TileReact: TileReact,
  Vector: Vector,
  Heatmap: HeatmapReact,
  Image: ImageReact,
};

export { 
  Layers,
  layer,
  HeatmapReact,
  ImageReact,
};
