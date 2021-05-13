import * as React from "react";
import { MapBrowserEvent } from "ol";
interface PointerState {
    action: string;
}
export declare class Pointer extends React.Component<{}, PointerState> {
    state: PointerState;
    timeout: number;
    handleEvent: (e: MapBrowserEvent<UIEvent>) => boolean;
    render(): JSX.Element;
}
export {};
