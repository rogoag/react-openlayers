import * as React from 'react';
import { AttributionProps } from './attribution';
import { RotateProps } from './rotate';
import { ZoomProps } from './zoom';
export interface ControlsProps {
    attribution?: boolean;
    attributionOptions?: AttributionProps;
    rotate?: boolean;
    rotateOptions?: RotateProps;
    zoom?: boolean;
    zoomOptions?: ZoomProps;
}
export declare class Controls extends React.Component<ControlsProps> {
    options: ControlsProps;
    constructor(props: ControlsProps);
    render(): JSX.Element;
}
