import { Overlay } from './overlay';
import { Overlays } from './overlays';
import olOverlay from 'ol/Overlay';

export interface OverlayType<T extends olOverlay> {
  overlayRef?(layer:T):void
}

export { 
  Overlays,
  Overlay,
};
