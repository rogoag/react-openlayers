import { VectorSourceReact } from './vector-source';
import { XYZReact } from './xyz-source';
import Source from 'ol/source/Source';
export interface SourceType<T extends Source> {
    sourceRef?(source: T): void;
}
declare const source: {
    VectorSourceReact: typeof VectorSourceReact;
    XYZReact: typeof XYZReact;
};
export { source };
