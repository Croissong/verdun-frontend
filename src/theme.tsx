import { createMuiTheme } from '@material-ui/core/styles';

// http://colormind.io/
// 95A0A4
// AFD4C5
// F0E1C6
// BD5C55
// 535670

export const colors = {
  green: {
    light: '#14ca14',
    main: '#1FA00D'
  },
  yellow: {
    light: '#FAEA6B',
    main: '#f0ad4e'
  },
  status: {
    danger: '#BD5C55'
  },

  tertiary: {
    main: '#F0E1C6'
  },
  quaternary: {
    main: '#535670'
  },
  aqua: '#07bbb5'
};

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#3da7dd',
      main: '#0d91d5',
      dark: '#096595',
      contrastText: '#000000'
    },
    secondary: {
      light: '#c6d1d5',
      main: '#95a0a4',
      dark: '#677275',
      contrastText: '#000000'
    }
  }
});
