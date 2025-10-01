import React from 'react';
import { Box, Button, Stack, TextField, Alert, Snackbar, Autocomplete } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useAppDispatch, useAppSelector } from '../../../state';
import { actions as reviewsActions } from '../state/slice';
import { gql, useQuery } from '@apollo/client';

const ALL_MOVIES = gql`
  query AllMovies {
    allMovies(orderBy: [TITLE_ASC]) {
      nodes {
        id
        title
      }
    }
  }
`;

export default function AddReviewForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.reviews);

  const [movieId, setMovieId] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [rating, setRating] = React.useState<number | null>(0);
  const [touched, setTouched] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const prevLoadingRef = React.useRef(loading);

  const { data: moviesData, loading: moviesLoading, error: moviesError } = useQuery(ALL_MOVIES, {
    fetchPolicy: 'cache-first',
  });

  React.useEffect(() => {
    if (prevLoadingRef.current && !loading && !error) {
      setShowSuccess(true);
      setTitle('');
      setComment('');
      setRating(0);
      // keep movieId to allow múltiples altas al mismo movie
    }
    prevLoadingRef.current = loading;
  }, [loading, error]);

  const hasErrors = () => {
    return !movieId || !title || !rating || rating < 0 || rating > 5;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (hasErrors()) return;
    dispatch(
      reviewsActions.addReview({
        title,
        body: comment || null,
        rating: Number(rating || 0),
        movieId,
      })
    );
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <Autocomplete
          loading={moviesLoading}
          options={(moviesData?.allMovies?.nodes ?? []) as { id: string; title: string }[]}
          getOptionLabel={(o) => o?.title ?? ''}
          onChange={(_e, option) => setMovieId(option?.id ?? '')}
          renderInput={(params) => (
            <TextField
              {...params}
              label={'Película'}
              error={touched && !movieId}
              helperText={
                touched && !movieId
                  ? 'Requerido'
                  : moviesError
                  ? 'Error cargando películas'
                  : ' '
              }
              fullWidth
            />
          )}
        />
        <TextField
          label={'Título'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={touched && !title}
          helperText={touched && !title ? 'Requerido' : ' '}
          fullWidth
        />
        <TextField
          label={'Comentario'}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          minRows={3}
          fullWidth
        />
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <span>{'Rating'}</span>
          <Rating value={Number(rating) || 0} precision={1} onChange={(_e, v) => setRating(v)} />
        </Stack>
        {error ? <Alert severity={'error'}>{error}</Alert> : null}
        <Box>
          <Button type={'submit'} variant={'contained'} disabled={loading || hasErrors()}>
            {loading ? 'Agregando...' : 'Agregar review'}
          </Button>
        </Box>
      </Stack>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        message={'Review agregado correctamente'}
      />
    </Box>
  );
}


