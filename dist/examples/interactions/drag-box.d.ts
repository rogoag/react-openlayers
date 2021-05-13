import * as React from "react";
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import Select from 'ol/interaction/Select';
import VectorSource from 'ol/source/Vector';
import { DragBoxEvent } from 'ol/interaction/DragBox';
import { SelectEvent } from 'ol/interaction/Select';
interface DragBoxState {
    selectedFeatures: Collection<Feature> | void;
}
export declare class DragBox extends React.Component<{}, DragBoxState> {
    state: DragBoxState;
    select: Select;
    source: VectorSource;
    constructor(props: {});
    clearSelectedFeatures: () => void;
    handleBoxEnd: (event: DragBoxEvent) => void;
    handleDeselect: (event: SelectEvent) => void;
    render(): JSX.Element;
}
export {};
