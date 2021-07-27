import * as React from 'react';

import olOverlay, { Options } from 'ol/Overlay'

import { OverlayType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface OverlayProps extends Options, OverlayType<olOverlay> {
  onChange?: ReactOpenlayersEvent
  onChangeelement?: ReactOpenlayersEvent
  onChangemap?: ReactOpenlayersEvent
  onChangeoffset?: ReactOpenlayersEvent
  onChangeposition?: ReactOpenlayersEvent
  onChangepositioning?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface OverlayEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:element': ReactOpenlayersEvent
  'change:map': ReactOpenlayersEvent
  'change:offset': ReactOpenlayersEvent
  'change:position': ReactOpenlayersEvent
  'change:positioning': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class Overlay extends React.Component<OverlayProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public overlay: olOverlay;
  public el: HTMLElement;
  public divRef: any = null;

  public options: Options = {
    id: undefined,
    element: undefined,
    offset: undefined,
    position: undefined,
    stopEvent: false,
    insertFirst: undefined,
    autoPan: undefined,
    autoPanAnimation: undefined,
    autoPanMargin: undefined
  };

  public events: OverlayEvents = {
    'change': undefined,
    'change:element': undefined,
    'change:map': undefined,
    'change:offset': undefined,
    'change:position': undefined,
    'change:positioning': undefined,
    'propertychange': undefined
  };

  public render() {
    return (
      <div>
        <div ref={(ref) => this.divRef = ref}>
          {this.props.children}
        </div>
      </div>
    );
  }

  public componentDidMount() {
    const options = Util.getOptions<Options, OverlayProps>(this.options, this.props);
    options.element = this.divRef;
    this.overlay = new olOverlay(options);
    this.context.overlays.push(this.overlay);
    if (this.props.overlayRef) this.props.overlayRef(this.overlay);
  }

  componentWillUnmount() {
    if(this.overlay) {
      this.context.overlays.remove(this.overlay);
      this.overlay.dispose();
    }
  }
}
