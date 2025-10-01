import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ReviewsList from '../features/reviews/components/ReviewsList';

const theme = createTheme({
  palette: {
    primary: { main: '#FF5722' }, // ejemplo naranja
  },
});

export default function Reviews() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={'md'} sx={{ py: 4 }}>
        <Typography variant={'h4'} gutterBottom>
          {'Reviews'}
        </Typography>
        <ReviewsList />
      </Container>
    </ThemeProvider>
  );
}