import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ReviewsList from '../features/reviews/components/ReviewsList';
import AddReviewForm from '../features/reviews/components/AddReviewForm';

const theme = createTheme({
  palette: {
    primary: { main: '#FF5722' }, // ejemplo naranja
  },
});

export default function Reviews() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={'lg'} sx={{ py: 4 }}>
        <Typography variant={'h4'} gutterBottom>
          {'Reviews'}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AddReviewForm />
          </Grid>
          <Grid item xs={12} md={8}>
            <ReviewsList />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}