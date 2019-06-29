import React from 'react';

import { HeaderH1 as H1, HeaderLayout as Layout, HeaderSubheader as Subheader } from './layout';

const Component: React.FunctionComponent = () => (
  <Layout>
    <H1>The Greatest Albums Of All Time</H1>
    <Subheader>haven’t been made yet</Subheader>
  </Layout>
);

export const Header = Component;
