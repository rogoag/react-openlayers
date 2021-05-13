import * as React from "react";
import { MapProps } from "map";
import GeometryType from 'ol/geom/GeometryType';
interface DrawState {
    view: MapProps['view'];
    interactionType: GeometryType;
}
export declare class Draw extends React.Component<{}, DrawState> {
    constructor(props: {});
    handleTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    render(): JSX.Element;
}
export {};
