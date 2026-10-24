# jira-jitsu

A small React playground for practicing custom hooks and state patterns, built with Vite.

## Tutorials

Each tutorial is a component in `src/components/` and they all render together in `App.jsx`.

| Tutorial | Topic | Files |
| --- | --- | --- |
| 1 | Fetching data with a custom `useFetch` hook backed by `useReducer` (loading / success / error states) | `Tutorial1.jsx`, `hooks/useFetch.js`, `state/reducer.js` |
| 2 | Debouncing input with `useDebounce` | `Tutorial2.jsx`, `hooks/useDebounce.js` |
| 3 | Timers with `useInterval`, compared to a hand-rolled `useEffect` + `setTimeout` version | `Tutorial3.jsx`, `hooks/useInterval.js` |

## Project structure

```
src/
  api/mock.js        # mockFetch: fake API with delay and random failures
  components/        # Tutorial components
  hooks/             # Custom hooks (useFetch, useDebounce, useInterval)
  state/reducer.js   # Reducer for fetch status
```

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the build
npm run lint     # lint with oxlint
```

## Stack

React 19, Vite, oxlint, and Vitest + Testing Library (installed but no tests yet).
