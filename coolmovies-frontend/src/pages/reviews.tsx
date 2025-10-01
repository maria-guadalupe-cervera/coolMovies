import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#FF5722' }, // ejemplo naranja
  },
});

export default function Reviews() {
  return (
    <ThemeProvider theme={theme}>
      <div>Reviewers Page</div>
    </ThemeProvider>
  );
}