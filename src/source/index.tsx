import { VectorSourceReact } from './vector-source';
import { XYZReact } from './xyz-source';
import Source from 'ol/source/Source';

export interface SourceType<T extends Source> {
  sourceRef?(source:T):void
}

const source = {
    VectorSourceReact,
    XYZReact
}

export { 
    source
};
