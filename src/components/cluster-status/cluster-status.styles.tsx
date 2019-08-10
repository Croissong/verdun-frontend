import { makeStyles, Theme } from '@material-ui/core/styles';
import { colors } from 'theme';

export const headerStyles = makeStyles<Theme, { healthy: boolean }>(
  (theme) => ({
    section: {
      marginBottom: '2rem'
    },
    header: {
      padding: '0.2rem 1rem',
      display: 'grid',
      gridTemplate:
        '[row1-start] ". status title ." [row1-end] / 20% 10% auto 30%'
    },
    title: {
      gridArea: 'title',
      display: 'flex',
      justifyContent: 'center',
      flexGrow: 1,
      '& h2': {
        fontFamily: 'serif',
        fontWeight: 500,
        width: 'max-content',
        letterSpacing: '0.2rem',
        fontSize: '2rem',
        marginBottom: 0
      }
    },
    status: {
      gridArea: 'status',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '5%',
      width: '6rem',
      paddingTop: '0.5rem'
    },
    heartbeat: {
      height: '2.5rem',
      width: '2.5rem',
      opacity: ({ healthy }) => (healthy === undefined ? 0.3 : 1),
      transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      color: ({ healthy }) =>
        healthy === undefined || healthy
          ? colors.green.main
          : colors.yellow.main
    }
  })
);
