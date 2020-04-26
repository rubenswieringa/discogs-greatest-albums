import React from 'react';

import {
  extendableStyledComponentAttrs,
  ExtendableStyledComponentProps,
  styledLayoutChild,
} from '@utils/styled-components';

import { FooterLayout as Layout, FooterP as P } from './layout';

const Component: React.FunctionComponent<ExtendableStyledComponentProps> = ({ className }) => (
  <Layout {...extendableStyledComponentAttrs(className)}>
    <P>
      a sample code project by{' '}
      <a href="https://rubenswieringa.com" target="_blank" rel="noopener noreferrer">
        Ruben Swieringa
      </a>
    </P>
  </Layout>
);

export const Footer = styledLayoutChild(Component);
