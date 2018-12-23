import { ScaleLine } from './scale-line';
import { Attribution } from './attribution';
import { FullScreen } from './full-screen';
import { MousePosition } from './mouse-position';
import { OverviewMap } from './overview-map';
import { Rotate } from './rotate';
import { ZoomSlider } from './zoom-slider';
import { ZoomToExtent } from './zoom-to-extent';
import { Zoom } from './zoom';
import { Controls } from './controls';

export interface ControlType<T extends ol.control.Control> {
  controlRef?(control:T):void
}

let control = {
  ScaleLine,
  Attribution,
  FullScreen,
  MousePosition,
  OverviewMap,
  Rotate,
  ZoomSlider,
  ZoomToExtent,
  Zoom,
};

export {
  Controls,
  control
};
