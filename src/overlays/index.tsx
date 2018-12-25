import { Overlay } from './overlay';
import { Overlays } from './overlays';

export interface OverlayType<T extends ol.Overlay> {
  overlayRef?(layer:T):void
}

export { 
  Overlays,
  Overlay,
};
