import { makeStyles, Theme } from '@material-ui/core/styles';
import { colors } from 'theme';

type Params = {
  healthy: boolean;
  warning: boolean;
  error: boolean;
};
const useStyles = makeStyles<Theme, Params>((theme) => ({
  wrapper: {
    display: 'table',
    margin: '0.4em',
    '& > span': {
      backgroundColor: '#656565',
      color: '#ffffff',
      display: 'table-cell',
      fontSize: '0.9em',
      fontWeight: 400,
      lineHeight: 1,
      padding: '.3em .6em',
      textAlign: 'center',
      verticalAlign: 'baseline',
      whiteSpace: 'pre',
      '&:first-child': {
        backgroundColor: ({ healthy, warning, error }) =>
          healthy
            ? colors.green.main
            : warning
            ? colors.yellow.main
            : colors.tertiary.main,
        borderBottomLeftRadius: '0.25em',
        borderTopLeftRadius: '.25em'
      },
      '&:nth-child(2)': {
        width: 50,
        borderBottomRightRadius: '0.25em',
        borderTopRightRadius: '.25em'
      }
    }
  }
}));
export default useStyles;
