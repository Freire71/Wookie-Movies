import theme from '../config/Theme';

type ThemedComponent = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends ThemedComponent {}
}
