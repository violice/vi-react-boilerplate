import { withTheme } from 'styled-components';

const ThemeLogger = withTheme(({ theme }) => {
  console.log('%cTHEME', 'color:#7D4CDB', theme);
  return null;
});

export default ThemeLogger;
