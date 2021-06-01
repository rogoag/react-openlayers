import * as React from "react";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import Collection from 'ol/Collection';
import { Coordinate } from "ol/coordinate";
export declare type SelectState = {
    active: boolean;
    selectedFeatures: Collection<Feature<Geometry>>;
    zoom: {
        value: number;
    };
    center: {
        value: Coordinate;
    };
};
export declare class Select extends React.Component {
    state: SelectState;
    zoom: {
        value: number;
    };
    constructor(props: {});
    handleSelectFeature(event: any): void;
    componentDidUpdate(_prevProps: any, prevState: SelectState): void;
    render(): JSX.Element;
}
