import { VectorSourceReact } from './vector-source';
import VectorSource from 'ol/source/Vector';

export interface SourceType<T extends VectorSource> {
  sourceRef?(source:T):void
}

const source = {
    VectorSourceReact,
    VectorSource,
}

export { 
    source
};
