import { makeStyles } from '@material-ui/core/styles';
import { colors } from 'theme';

export const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%'
  },
  healthy: {
    boxShadow: `0px 1px 3px 0px ${colors.green.main}, 0px 1px 3px 0px ${colors.green.main}, 0px 0px 3px -1px ${colors.green.main}`
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerRight: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    marginRight: '2rem'
  },
  url: {
    fontStyle: 'italic',
    fontSize: '1.3em'
  }
  /* image: {
   *   backgroundColor: '#656565',
   *   color: '#ffffff',
   *   borderBottomLeftRadius: '0.25em',
   *   borderTopLeftRadius: '.25em',
   *   borderBottomRightRadius: '0.25em',
   *   borderTopRightRadius: '.25em',
   *   padding: '.3em .6em',
   *   fontSize: '0.9em'
   * } */
}));
