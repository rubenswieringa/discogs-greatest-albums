import React, { useEffect, useRef } from 'react';
import dialogPolyfill from 'dialog-polyfill';
import styled from 'styled-components';

import { ExtendableStyledComponentProps, extendableStyledComponentAttrs } from '@utils/styled-components';

const StyledComponent = styled.dialog({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  margin: 0,
});

interface Props extends ExtendableStyledComponentProps {
  children?: JSX.Element | string;
  open?: boolean;
}

export const Dialog: React.FunctionComponent<Props> = ({ children, className, open }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogPolyfill.registerDialog(ref.current as HTMLElement);
  }, []);

  return (
    <StyledComponent open={open} ref={ref} {...extendableStyledComponentAttrs(className)}>
      {children}
    </StyledComponent>
  );
};
