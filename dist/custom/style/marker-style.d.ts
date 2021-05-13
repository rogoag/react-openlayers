import Style from 'ol/style/Style';
export declare class MarkerStyle {
    src: string;
    style: Style;
    constructor(src?: string);
    selectStyleFunction: () => Style;
}
