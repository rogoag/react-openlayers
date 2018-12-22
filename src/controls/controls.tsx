import * as React from 'react';
import ol from 'ol'

import {Util} from '../util';
import { AttributionProps } from './attribution';
import { RotateProps } from './rotate';
import { ZoomProps } from './zoom';

export interface ControlsOptions {
  attribution?: boolean
  attributionOptions?: AttributionProps
  rotate?: boolean
  rotateOptions?: RotateProps
  zoom?: boolean
  zoomOptions?: ZoomProps
}

export type ControlsProps = ControlsOptions;

// I wish I can name it as 'layers', not 'Layers'
export class Controls extends React.Component<ControlsProps, any> {

  options: ControlsOptions = {
    attribution  : undefined,
    attributionOptions: undefined,
    rotate: undefined,
    rotateOptions: undefined,
    zoom: undefined,
    zoomOptions: undefined
  };

  constructor(props) {
    super(props);
    this.options = Util.getOptions(Object.assign(this.options, this.props));
  }

  render() {
    return (<div>{this.props.children}</div>);
  }

  componentDidMount () {} 

  componentWillUnmount () {}
}