import { Epic } from 'redux-observable';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RootState } from '../../../state/store';
import { EpicDependencies } from '../../../state/types';
import { actions, ReviewsSliceAction } from './slice';
import {
  ReviewsDocument,
  ReviewsQuery,
  ReviewsQueryVariables,
  CreateReviewDocument,
  CreateReviewMutation,
  CreateReviewMutationVariables,
} from '../../../generated/graphql';

export const fetchReviewsEpic: Epic<
  ReviewsSliceAction['fetchReviews'],
  any,
  RootState,
  EpicDependencies
> = (action$, _state$, { client }) =>
  action$.pipe(
    filter(actions.fetchReviews.match),
    switchMap(() =>
      client
        .query<ReviewsQuery, ReviewsQueryVariables>({
          query: ReviewsDocument,
          fetchPolicy: 'network-only',
        })
        .then((res) => actions.fetchReviewsSuccess(res.data.allMovieReviews?.nodes as any))
        .catch((err: Error) => actions.fetchReviewsError(err.message))
    )
  );

export const addReviewEpic: Epic<
  ReviewsSliceAction['addReview'],
  any,
  RootState,
  EpicDependencies
> = (action$, _state$, { client }) =>
  action$.pipe(
    filter(actions.addReview.match),
    switchMap(({ payload }) =>
      client
        .mutate<CreateReviewMutation, CreateReviewMutationVariables>({
          mutation: CreateReviewDocument,
          variables: {
            input: {
              movieReview: {
                title: payload.title,
                body: payload.body ?? null,
                rating: payload.rating,
                movieId: payload.movieId,
                userReviewerId: undefined
              },
            },
          },
        })
        .then((res) => actions.addReviewSuccess(res.data!.createMovieReview!.movieReview as any))
        .catch((err: Error) => actions.addReviewError(err.message))
    )
  );



