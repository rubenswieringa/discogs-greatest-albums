import React from 'react';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Overview } from '@views/Overview';

import { AppLayout as Layout } from './layout';

export const App: React.FunctionComponent = () => {
  return (
    <Layout>
      <Header />
      <Overview />
      <Footer />
    </Layout>
  );
};
