import { HeatmapReact } from './heatmap';
import { ImageReact } from './image';
import { Layers } from './layers';
import { TileReact } from './tile';
import { Vector } from './vector';
import { VectorImage } from './vector-image';
import Layer from 'ol/layer/Layer';
export interface LayerType<T extends Layer> {
    layerRef?(layer: T): void;
}
declare const layer: {
    TileReact: typeof TileReact;
    Vector: typeof Vector;
    Heatmap: typeof HeatmapReact;
    Image: typeof ImageReact;
    VectorImage: typeof VectorImage;
};
export { Layers, layer, HeatmapReact, ImageReact, };
