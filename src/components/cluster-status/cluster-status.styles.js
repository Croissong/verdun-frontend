import { makeStyles } from '@material-ui/core/styles';

export const headerStyles = makeStyles((theme) => ({
  section: {
    marginBottom: '2rem'
  },
  header: {
    padding: '0.2rem 13% 0.2rem 1rem',
    justifyContent: 'center',
    display: 'flex'
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
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
        ? theme.palette.green.main
        : theme.palette.yellow.main
  }
}));
