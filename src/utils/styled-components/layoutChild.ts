// In the styles for a StyledComponent, you can reference a child by its
// HTML-tag, or by it’s (JS-) class. Referencing by class only works for
// StyledComponents, so styledLayoutChild() is a convenience-method for
// exporting regular React-components in a format that allows them to be styled
// in StyledComponent-layouts.

import React from 'react';
import styled from 'styled-components';

export const styledLayoutChild = (component: React.FunctionComponent<any>) => styled(component)({});
