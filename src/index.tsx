// import { DoubleClickZoomProps } from './interactions/double-click-zoom'
// import { DragAndDropProps } from './interactions/drag-and-drop'
// import { DragBoxProps } from './interactions/drag-box'
// import { DragPanProps } from './interactions/drag-pan'
// import { DragRotateProps } from './interactions/drag-rotate'
// import { DragRotateAndZoomProps } from './interactions/drag-rotate-and-zoom'
// import { DragZoomProps } from './interactions/drag-zoom'
// import { DrawProps } from './interactions/draw'
// import { ExtentProps } from './interactions/extent'
// import { KeyboardPanProps } from './interactions/keyboard-pan'
// import { KeyboardZoomProps } from './interactions/keyboard-zoom'
// import { ModifyProps } from './interactions/modify'
// import { MouseWheelZoomProps } from './interactions/mouse-wheel-zoom'
// import { PinchRotateProps } from './interactions/pinch-rotate'
// import { PinchZoomProps } from './interactions/pinch-zoom'
// import { PointerProps } from './interactions/pointer'
// import { SelectProps } from './interactions/select'
// import { SnapProps } from './interactions/snap'
// import { TranslateProps } from './interactions/translate'

import { Controls, control } from './controls/index';
import { Interactions, interaction } from './interactions/index';
import { Layers, layer } from './layers/index';
import { Overlays, Overlay } from './overlays';
import { custom } from './custom/index';

import { Map, MapContext } from './map';
import { Util } from './util';

// declare module 'react-openlayers' {
//   export interface interaction {
//     DoubleClickZoom: DoubleClickZoomProps
//     DragAndDrop: DragAndDropProps
//     DragBox: DragBoxProps
//     DragPan: DragPanProps
//     DragRotate: DragRotateProps
//     DragRotateAndZoom: DragRotateAndZoomProps
//     DragZoom: DragZoomProps
//     Draw: DrawProps
//     Extent: ExtentProps
//     KeyboardPan: KeyboardPanProps
//     KeyboardZoom: KeyboardZoomProps
//     Modify: ModifyProps
//     MouseWheelZoom: MouseWheelZoomProps
//     PinchRotate: PinchRotateProps
//     PinchZoom: PinchZoomProps
//     Pointer: PointerProps
//     Select: SelectProps
//     Snap: SnapProps
//     Translate: TranslateProps
//   }
// }

export {
  //groups
  Interactions,
  Layers,
  Overlays,
  Controls,

  //name spaces
  layer,
  custom,
  control,
  interaction,

  //Objects
  Map,
  MapContext,
  Overlay,

  Util
};
