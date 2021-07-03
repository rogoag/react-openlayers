import {HeatmapReact} from './heatmap';
import {ImageReact} from './image';
import {Layers} from './layers';
import {TileReact} from './tile';
import {Vector} from './vector';
import {VectorImage} from './vector-image';
import Layer from 'ol/layer/Layer';

export interface LayerType<T extends Layer> {
  layerRef?(layer:T):void
}

const layer = {
  TileReact: TileReact,
  Vector: Vector,
  Heatmap: HeatmapReact,
  Image: ImageReact,
  VectorImage: VectorImage
};

export { 
  Layers,
  layer,
  HeatmapReact,
  ImageReact,
};
