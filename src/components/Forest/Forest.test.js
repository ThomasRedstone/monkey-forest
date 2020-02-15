import React from 'react';
import { render, act } from '@testing-library/react';
import Forest from '.';

import { useInterval } from '../../helpers/useInterval';
jest.mock('../../helpers/useInterval');

it('matches snapshot', () => {
  const { asFragment } = render(<Forest />);
  expect(asFragment).toMatchSnapshot();
});

it('registers the useInterval hook', () => {
  useInterval.mockClear();
  render(<Forest />);
  expect(useInterval.mock.calls.length).toEqual(1);
  let shuffleResult;
  act(() => shuffleResult = useInterval.mock.calls[0][0]());
  expect(shuffleResult).toEqual(undefined);
});
