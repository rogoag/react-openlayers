import * as React from 'react';
import {Link, Route} from 'react-router-dom';

import {Select} from './select';
import {Draw} from './draw';
import {Modify} from './modify';
import {DoubleClickZoom} from './double-click-zoom';
import {DragAndDrop} from './drag-and-drop';
import {DragBox} from './drag-box';
import {DragPan} from './drag-pan';
import {DragRotateAndZoom} from './drag-rotate-and-zoom';
import {DragRotate} from './drag-rotate';
import {DragZoom} from './drag-zoom';
import {KeyboardPan} from './keyboard-pan';
import {KeyboardZoom} from './keyboard-zoom';
import {MouseWheelZoom} from './mouse-wheel-zoom';
import {PinchRotate} from './pinch-rotate';
import {PinchZoom} from './pinch-zoom';
import {Pointer} from './pointer';
import {Snap} from './snap';
import {Translate} from './translate';

export {Select} from './select';
export {Draw} from './draw';
export {Modify} from './modify';
export {DoubleClickZoom} from './double-click-zoom';
export {DragAndDrop} from './drag-and-drop';
export {DragBox} from './drag-box';
export {DragPan} from './drag-pan';
export {DragRotateAndZoom} from './drag-rotate-and-zoom';
export {DragRotate} from './drag-rotate';
export {DragZoom} from './drag-zoom';
export {KeyboardPan} from './keyboard-pan';
export {KeyboardZoom} from './keyboard-zoom';
export {MouseWheelZoom} from './mouse-wheel-zoom';
export {PinchRotate} from './pinch-rotate';
export {PinchZoom} from './pinch-zoom';
export {Pointer} from './pointer';
export {Snap} from './snap';
export {Translate} from './translate';

export class Interactions extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>Interactions</h1>
        <ul role="nav" className="group-menu">
          <li><Link to="interactions/select">Select</Link></li>
          <li><Link to="interactions/draw">Draw</Link></li>
          <li><Link to="interactions/modify">Modify</Link></li>
          <li><Link to="interactions/double-click-zoom">DoubleClickZoom</Link></li>
          <li><Link to="interactions/drag-and-drop">DragAndDrop</Link></li>
          <li><Link to="interactions/drag-box">DragBox</Link></li>
          <li><Link to="interactions/drag-pan">DragPan</Link></li>
          <li><Link to="interactions/drag-rotate-and-zoom">DragRotateAndZoom</Link></li>
          <li><Link to="interactions/drag-rotate">DragRotate</Link></li>
          <li><Link to="interactions/drag-zoom">DragZoom</Link></li>
          <li><Link to="interactions/keyboard-pan">KeyboardPan</Link></li>
          <li><Link to="interactions/keyboard-zoom">KeyboardZoom</Link></li>
          <li><Link to="interactions/mouse-wheel-zoom">MouseWheelZoom</Link></li>
          <li><Link to="interactions/pinch-rotate">PinchRotate</Link></li>
          <li><Link to="interactions/pinch-zoom">PinchZoom</Link></li>
          <li><Link to="interactions/pointer">Pointer</Link></li>
          <li><Link to="interactions/snap">Snap</Link></li>
          <li><Link to="interactions/translate">Translate</Link></li>
        </ul>

        <div className="contents">
          <Route component={Select} />
          <Route path="select" component={Select} />
          <Route path="draw" component={Draw} />
          <Route path="modify" component={Modify} />
          <Route path="double-click-zoom" component={DoubleClickZoom} />
          <Route path="drag-and-drop" component={DragAndDrop} />
          <Route path="drag-box" component={DragBox} />
          <Route path="drag-pan" component={DragPan} />
          <Route path="drag-rotate-and-zoom" component={DragRotateAndZoom} />
          <Route path="drag-rotate" component={DragRotate} />
          <Route path="drag-zoom" component={DragZoom} />
          <Route path="keyboard-pan" component={KeyboardPan} />
          <Route path="keyboard-zoom" component={KeyboardZoom} />
          <Route path="mouse-wheel-zoom" component={MouseWheelZoom} />
          <Route path="pinch-rotate" component={PinchRotate} />
          <Route path="pinch-zoom" component={PinchZoom} />
          <Route path="pointer" component={Pointer} />
          <Route path="snap" component={Snap} />
          <Route path="translate" component={Translate} />
        </div>
      </div>
    );
  }
}
