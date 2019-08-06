// If you want to extend a non-StyledComponent as a StyledComponent, then the
// to-be-extended React-component needs to have a className-property, and that
// property needs to be added (in the JSX) as an attribute – the interface and
// util-function below make this easier.

export interface ExtendableStyledComponentProps {
  className?: string;
}

export const extendableStyledComponentAttrs = (className: string | undefined) => ({ className });
