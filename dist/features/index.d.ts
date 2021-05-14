import { PointReact } from './point';
import { LineStringReact } from './linestring';
import { PolygonReact } from './polygon';
import { MultiPolygonReact } from './multipolygon';
declare const feature: {
    PointReact: typeof PointReact;
    LineStringReact: typeof LineStringReact;
    PolygonReact: typeof PolygonReact;
    MultiPolygonReact: typeof MultiPolygonReact;
};
export { feature, PointReact, LineStringReact, PolygonReact, MultiPolygonReact };
