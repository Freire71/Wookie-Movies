import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { getMovies, getMoviesSearch } from '../movies';
import { reactQueryWrapper, movies } from '../../../utils/Tests';

const handlers = [
  rest.get('https://wookie.codesubmit.io/movies', (req, res, ctx) => {
    return res(
      ctx.json({
        movies,
      })
    );
  }),
];

describe('movies hooks', () => {
  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should fetch movies data when using  getMovies hook', async () => {
    const { result, waitForNextUpdate } = renderHook(() => getMovies(), {
      wrapper: reactQueryWrapper,
    });

    await waitForNextUpdate();
    expect(result.current.isFetching).toBe(false);
    expect(result.current.data.data.movies).not.toBeNull();
  });
  it('should fetch movies data when using getMoviesSearch hook', async () => {
    const { result, waitForNextUpdate } = renderHook(() => getMoviesSearch(), {
      wrapper: reactQueryWrapper,
    });

    await waitForNextUpdate();
    expect(result.current.isFetching).toBe(false);
    expect(result.current.data.data.movies).not.toBeNull();
  });
});
