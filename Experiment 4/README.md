# Experiment 4 – Interactive Calendar with React Performance Optimization

## Aim

To develop an interactive calendar application using React and demonstrate
performance optimization techniques, API mocking, re-render monitoring,
drag-and-drop functionality, and automated testing.

## Technologies Used

- React
- Vite
- JavaScript
- CSS
- React Testing Library
- Vitest
- MSW (Mock Service Worker)

## Features

### 1. Interactive Weekly Calendar

The application displays events across seven days:

- Monday
- Tuesday
- Wednesday
- Thursday
- Friday
- Saturday
- Sunday

### 2. Drag and Drop

Events can be dragged from one day and dropped onto another day.

### 3. React.memo

`React.memo` is used to prevent unnecessary re-rendering of event cards
when their properties have not changed.

### 4. useCallback

`useCallback` is used to maintain stable function references for event
handlers.

### 5. useMemo

`useMemo` is used to cache the filtered agenda list and avoid unnecessary
calculations.

### 6. Live Clock

The live clock creates regular state updates to simulate unrelated
application activity. This makes it possible to observe how optimization
techniques affect component re-rendering.

### 7. Render Monitor

The application displays:

- Total renders
- Cards rendered
- Individual event render counters

This helps visualize React's rendering behavior.

### 8. API Mocking

MSW is used to mock the `/api/events` API endpoint.

The application loads event data through the API instead of depending
directly on hard-coded data.

### 9. Automated Testing

React Testing Library and Vitest are used to test:

- Calendar title
- Weekday columns
- Optimization controls
- Event cards
- Optimization switch interaction
- API-loaded events

## Test Results

All automated tests are passing.

**6 / 6 tests passed**

## Test Coverage

Coverage is generated using Vitest and V8.

Current coverage:

| Metric | Coverage |
|---|---:|
| Statements | 65.06% |
| Branches | 63.88% |
| Functions | 47.22% |
| Lines | 67.53% |

The MSW mock files currently have 100% coverage.

## Commands

### Start Development Server

```bash
npm run dev