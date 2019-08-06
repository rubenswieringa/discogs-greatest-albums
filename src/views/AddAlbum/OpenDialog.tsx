import React from 'react';

import { Dialog } from '@components/Dialog';
import { extendableStyledComponentAttrs, ExtendableStyledComponentProps } from '@utils/styled-components';

interface Props extends ExtendableStyledComponentProps {
  children?: JSX.Element;
}

export const OpenDialog: React.FunctionComponent<Props> = ({ children, className }) => (
  <Dialog open {...extendableStyledComponentAttrs(className)}>
    {children}
  </Dialog>
);
