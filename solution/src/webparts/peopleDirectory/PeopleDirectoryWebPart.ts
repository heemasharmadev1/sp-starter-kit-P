import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PeopleDirectoryWebPartStrings';
import { PeopleDirectory, PeopleDirectoryProps } from './components/PeopleDirectory/';

export interface IPeopleDirectoryWebPartProps {
  title: string;
}

export default class PeopleDirectoryWebPart extends BaseClientSideWebPart<IPeopleDirectoryWebPartProps> {
  public render(): void {
    const element: React.ReactElement<PeopleDirectoryProps> = React.createElement(
      PeopleDirectory,
      {
        webUrl: this.context.pageContext.web.absoluteUrl,
        spHttpClient: this.context.spHttpClient,
        title: this.properties.title,
        displayMode: this.displayMode,
        onTitleUpdate: (newTitle: string) => {
          this.properties.title = newTitle;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}