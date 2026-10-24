import { useEffect, useReducer } from 'react';
import { reducer, initialState } from '../state/reducer';

export function useFetch(fetcher, deps = []) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: 'FETCH_START' });

    fetcher(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) dispatch({ type: 'FETCH_SUCCESS', payload: data });
      })
      .catch((err) => {
        if (!controller.signal.aborted) dispatch({ type: 'FETCH_ERROR', error: err.message });
      });

    return () => controller.abort(); // cleanup = cancel the old request
  }, deps);

  return state;
}