import * as React from 'react';

export class Overlays extends React.Component {
  public render() {
    return (<div>{this.props.children}</div>);
  }
}
