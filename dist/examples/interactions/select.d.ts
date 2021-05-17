import * as React from "react";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
export declare type SelectState = {
    active: boolean;
    selectedFeature: Feature<Geometry> | null;
};
export declare class Select extends React.Component {
    state: SelectState;
    constructor(props: {});
    componentDidMount(): void;
    render(): JSX.Element;
}
