import React from 'react';

import {
  extendableStyledComponentAttrs,
  ExtendableStyledComponentProps,
  styledLayoutChild,
} from '@utils/styled-components';

import { HeaderH1 as H1, HeaderLayout as Layout } from './layout';

const Component: React.FunctionComponent<ExtendableStyledComponentProps> = ({ className }) => (
  <Layout {...extendableStyledComponentAttrs(className)}>
    <H1>The Greatest Albums Of All Time</H1>
  </Layout>
);

export const Header = styledLayoutChild(Component);
