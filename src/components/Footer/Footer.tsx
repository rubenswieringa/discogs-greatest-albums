import React from 'react';

import { FooterLayout as Layout } from './layout';

const Component: React.FunctionComponent = () => (
  <Layout>
    <p>
      A sample project by{' '}
      <a href="https://rubenswieringa.com" target="_blank" rel="noopener noreferrer">
        Ruben Swieringa
      </a>
      .
    </p>
  </Layout>
);

export const Footer = Component;
