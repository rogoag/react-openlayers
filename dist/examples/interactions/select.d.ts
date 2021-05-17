import * as React from "react";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import Collection from 'ol/Collection';
export declare type SelectState = {
    active: boolean;
    selectedFeatures: Collection<Feature<Geometry>>;
};
export declare class Select extends React.Component {
    state: SelectState;
    constructor(props: {});
    componentDidMount(): void;
    render(): JSX.Element;
}
