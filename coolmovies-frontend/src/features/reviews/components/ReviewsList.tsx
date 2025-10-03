import React from 'react';
import { Box, CircularProgress, Alert, List, ListItem, ListItemText, Stack, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useAppDispatch, useAppSelector } from '../../../state';
import { actions as reviewsActions } from '../state/slice';

type SortOrder = 'rating_desc' | 'rating_asc' | 'id_desc';

export default function ReviewsList() {
  const dispatch = useAppDispatch();
  const { reviews, loading, error } = useAppSelector((s) => s.reviews);
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('id_desc');

  React.useEffect(() => {
    dispatch(reviewsActions.fetchReviews(sortOrder));
  }, [dispatch, sortOrder]);

  const handleSortChange = (event: any) => {
    setSortOrder(event.target.value);
  };

  if (loading) {
    return (
      <Box role={'status'} aria-live={'polite'} display={'flex'} alignItems={'center'} justifyContent={'center'} py={4}>
        <CircularProgress aria-label={'Cargando reviews'} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={2}>
        <Alert role={'alert'} severity={'error'}>{error}</Alert>
      </Box>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <Box py={2}>
        <Alert role={'status'} severity={'info'}>{'No hay reviews aún.'}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <FormControl sx={{ minWidth: 200, mb: 2 }}>
        <InputLabel id="sort-label">Ordenar por</InputLabel>
        <Select
          labelId="sort-label"
          value={sortOrder}
          label="Ordenar por"
          onChange={handleSortChange}
        >
          <MenuItem value="id_desc">Más recientes</MenuItem>
          <MenuItem value="rating_desc">Mejor rating</MenuItem>
          <MenuItem value="rating_asc">Peor rating</MenuItem>
        </Select>
      </FormControl>
      <List aria-label={'Listado de reviews'}>
        {reviews.map((r) => (
          <ListItem key={r.id} alignItems={'flex-start'} role={'article'} aria-label={`Review ${r.title}`}>
            <Stack spacing={0.5} width={'100%'}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant={'subtitle1'} fontWeight={600}>
                  {r.title}
                </Typography>
                <Rating aria-label={`Rating ${r.rating}`} name={`rating-${r.id}`} value={Number(r.rating) || 0} readOnly precision={0.5} />
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
    </Box>
  );
}


