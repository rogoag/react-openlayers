import { AttributionReact } from './attribution';
import { Controls } from './controls';
import { FullScreenReact } from './full-screen';
import { MousePositionReact } from './mouse-position';
import { OverviewMapReact } from './overview-map';
import { RotateReact } from './rotate';
import { ScaleLineReact } from './scale-line';
import { ZoomReact } from './zoom';
import { ZoomSliderReact } from './zoom-slider';
import { ZoomToExtentReact } from './zoom-to-extent';
import { Control } from 'ol/control';

export interface ControlType<T extends Control> {
  controlRef?(control:T):void
}

const control = {
  ScaleLineReact,
  AttributionReact,
  FullScreenReact,
  MousePositionReact,
  OverviewMapReact,
  RotateReact,
  ZoomSliderReact,
  ZoomToExtentReact,
  ZoomReact,
};

export {
  Controls,
  control
};
