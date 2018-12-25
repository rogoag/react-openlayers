import * as React from 'react';

import './popup.css';

export class Popup extends React.Component {
  private containerEl: React.RefObject<HTMLDivElement>;
  private contentEl: React.RefObject<HTMLDivElement>;
  private contentClose: React.RefObject<HTMLAnchorElement>;

  constructor(props: {}) {
    super(props);
    this.containerEl = React.createRef<HTMLDivElement>();
    this.contentEl = React.createRef<HTMLDivElement>();
    this.contentClose = React.createRef<HTMLAnchorElement>();
  }

  public componentDidMount() {
    if (this.contentClose.current) {
      this.contentClose.current.addEventListener("click", () => {
        if (this.containerEl.current) {
          this.containerEl.current.style.display = 'none';
        }
      });
    }
  }

  public render() {
    return (
      <div className="olPopup" ref={this.containerEl}>
        <a
          className="olPopupCloser" role="button"
          href="javascript:void(0)"
          ref={this.contentClose}
        ></a>
        <div className="olPopupContents" ref={this.contentEl}></div>
      </div>
    );
  }

  public setContents(html: string) {
    if (this.contentEl.current) {
      // tslint:disable-next-line
      this.contentEl.current.innerHTML = html;
    }
  }

  public show(bottomDistance: string = '12px') {
    if (this.containerEl.current) {
      this.containerEl.current.style.bottom = bottomDistance;
      this.containerEl.current.style.display = 'block';
    }
  }
}