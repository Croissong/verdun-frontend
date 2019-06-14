import { createMuiTheme } from '@material-ui/core/styles';

// http://colormind.io/
// 95A0A4
// AFD4C5
// F0E1C6
// BD5C55
// 535670
export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#e1fff8',
      main: '#afd4c5',
      dark: '#7fa395',
      contrastText: '#000000'
    },
    secondary: {
      light: '#c6d1d5',
      main: '#95a0a4',
      dark: '#677275',
      contrastText: '#000000'
    },
    tertiary: {
      main: '#F0E1C6'
    },
    quaternary: {
      main: '#535670'
    }
  },
  status: {
    danger: '#BD5C55'
  }
});
