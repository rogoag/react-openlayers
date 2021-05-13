import * as React from 'react';
import './popup.css';
export declare class Popup extends React.Component {
    private containerEl;
    private contentEl;
    private contentClose;
    constructor(props: {});
    componentDidMount(): void;
    render(): JSX.Element;
    setContents(html: string): void;
    show(bottomDistance?: string): void;
}
