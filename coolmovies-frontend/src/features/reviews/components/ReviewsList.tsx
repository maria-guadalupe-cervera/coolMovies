import React from 'react';
import { Box, CircularProgress, Alert, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useAppDispatch, useAppSelector } from '../../../state';
import { actions as reviewsActions } from '../state/slice';

export default function ReviewsList() {
  const dispatch = useAppDispatch();
  const { reviews, loading, error } = useAppSelector((s) => s.reviews);

  React.useEffect(() => {
    dispatch(reviewsActions.fetchReviews());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={2}>
        <Alert severity={'error'}>{error}</Alert>
      </Box>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <Box py={2}>
        <Alert severity={'info'}>{'No hay reviews aún.'}</Alert>
      </Box>
    );
  }

  return (
    <List>
      {reviews.map((r) => (
        <ListItem key={r.id} alignItems={'flex-start'}>
          <Stack spacing={0.5} width={'100%'}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography variant={'subtitle1'} fontWeight={600}>
                {r.title}
              </Typography>
              <Rating name={`rating-${r.id}`} value={Number(r.rating) || 0} readOnly precision={0.5} />
            </Stack>
            {r.body ? (
              <Typography variant={'body2'} color={'text.secondary'}>
                {r.body}
              </Typography>
            ) : null}
            <ListItemText
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
              primary={`Movie ID: ${r.movieId}`}
            />
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}


