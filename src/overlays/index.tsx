import { Overlays } from './overlays';
import { Overlay } from './overlay';

export interface OverlayType<T extends ol.Overlay> {
  overlayRef?(layer:T):void
}

export { 
  Overlays,
  Overlay,
};
