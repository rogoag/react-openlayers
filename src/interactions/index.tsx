import { DoubleClickZoomReact } from './double-click-zoom';
import { DragAndDropReact } from './drag-and-drop';
import { DragBoxReact } from './drag-box';
import { DragPanReact } from './drag-pan';
import { DragRotateReact } from './drag-rotate';
import { DragRotateAndZoomReact } from './drag-rotate-and-zoom';
import { DragZoomReact } from './drag-zoom';
import { DrawReact } from './draw';
import { ExtentReact } from './extent';
import { Interactions } from './interactions';
import { KeyboardPanReact } from './keyboard-pan';
import { KeyboardZoomReact } from './keyboard-zoom';
import { ModifyReact } from './modify';
import { MouseWheelZoomReact } from './mouse-wheel-zoom';
import { PinchRotateReact } from './pinch-rotate';
import { PinchZoomReact } from './pinch-zoom';
import { PointerReact } from './pointer';
import { SelectReact } from './select';
import { SnapReact } from './snap';
import { TranslateReact } from './translate';
import Interaction from 'ol/interaction/Interaction';

export interface InteractionType<T extends Interaction> {
  active?:boolean
  interactionRef?(ref:T):void,
}

const interaction = {
  DoubleClickZoomReact,
  DragAndDropReact,
  DragBoxReact,
  DragPanReact,
  DragRotateReact,
  DragRotateAndZoomReact,
  DragZoomReact,
  DrawReact,
  ExtentReact,
  KeyboardPanReact,
  KeyboardZoomReact,
  ModifyReact,
  MouseWheelZoomReact,
  PinchRotateReact,
  PinchZoomReact,
  PointerReact,
  SelectReact,
  SnapReact,
  TranslateReact
};

export {
  Interactions,
  interaction
};

