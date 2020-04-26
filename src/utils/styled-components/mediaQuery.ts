import { paramCase } from 'param-case';

type MediaQueryValue = number | string | boolean;
type MediaQueryProperty =
  | 'anyHover'
  | 'anyPointer'
  | 'aspectRatio'
  | 'color'
  | 'colorGamut'
  | 'colorIndex'
  | 'deviceAspectRatio'
  | 'deviceHeight'
  | 'deviceWidth'
  | 'displayMode'
  | 'forcedColors'
  | 'grid'
  | 'height'
  | 'hover'
  | 'invertedColors'
  | 'lightLevel'
  | 'maxHeight'
  | 'maxWidth'
  | 'minHeight'
  | 'minWidth'
  | 'monochrome'
  | 'orientation'
  | 'overflowBlock'
  | 'overflowInline'
  | 'pointer'
  | 'prefersColorScheme'
  | 'prefersContrast'
  | 'prefersReducedMotion'
  | 'prefersReducedTransparency'
  | 'resolution'
  | 'scan'
  | 'scripting'
  | 'update'
  | 'width';

type MediaQueryParams = Partial<{ [prop in MediaQueryProperty]: MediaQueryValue }>;

const formatMediaQueryPart = (key: MediaQueryProperty, value: MediaQueryValue) => {
  const prop = paramCase(key);
  switch (typeof value) {
    case 'number':
      return `${prop}: ${value}px`;
    case 'boolean':
      return value ? prop : `not(${prop})`;
    default:
      return `${prop}: ${value?.toString()}`;
  }
};

export const mediaQuery = (params: MediaQueryParams) => {
  const parts = Object.entries(params).map(
    ([key, value]) => `(${formatMediaQueryPart(key as MediaQueryProperty, value as MediaQueryValue)})`,
  );
  return `@media ${parts.join(' and ')}`;
};
