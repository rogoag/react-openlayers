import { HeatmapReact } from './heatmap';
import { ImageReact } from './image';
import { Layers } from './layers';
import { TileReact } from './tile';
import { Vector } from './vector';
import Layer from 'ol/layer/Layer';
export interface LayerType<T extends Layer> {
    layerRef?(layer: T): void;
}
declare const layer: {
    TileReact: typeof TileReact;
    Vector: typeof Vector;
    Heatmap: typeof HeatmapReact;
    Image: typeof ImageReact;
};
export { Layers, layer, HeatmapReact, ImageReact, };
