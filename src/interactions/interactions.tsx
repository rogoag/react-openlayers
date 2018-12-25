import * as React from 'react';

export type InteractionsProps = ol.olx.interaction.DefaultsOptions;

export class Interactions extends React.Component<InteractionsProps> {
  public render() {
    return (<div>{this.props.children}</div>);
  }
}