import * as React from 'react';
import Style from 'ol/style/Style';
import Event from 'ol/events/Event';
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type ReactOpenlayersEvent<T extends Event = Event> = ((event: T | Event) => void) | void;
export interface ReactOpenlayersEvents {
    [key: string]: ((event: Event | void) => void) | void;
}
/**
 * Extract default options from props
 *
 * @param defaultOpts Default options
 * @param props Props to extract
 */
export declare const getOptions: <O, P>(defaultOpts: O, props: P) => O;
/**
 * Converts eventName to camelCase
 *
 * @param {string} eventName
 * @returns {string}
 */
export declare const getPropsKey: (eventName: string) => string;
/**
 * Extract events from props
 *
 * @param events
 * @param props
 */
export declare const getEvents: <E extends ReactOpenlayersEvents, P>(events: E, props: P) => Partial<P>;
/**
 * Clones recursively Style objects
 *
 * @param obj Style object
 */
export declare const cloneStyle: (obj: Style) => Style;
/**
 * Search children for a given element type
 *
 * @param children React children
 * @param childType Child type to find
 */
export declare const findChild: <T extends React.ReactElement<{}, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>>(children: React.ReactNode, childType: string) => void | T;
declare const _default: {
    getOptions: <O, P>(defaultOpts: O, props: P) => O;
    getEvents: <E extends ReactOpenlayersEvents, P>(events: E, props: P) => Partial<P>;
    cloneStyle: (obj: Style) => Style;
    findChild: <T extends React.ReactElement<{}, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>>(children: React.ReactNode, childType: string) => void | T;
};
export default _default;
