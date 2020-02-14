import React from 'react';
import { render } from '@testing-library/react';
import Forest from '.';

it('matches snapshot', () => {
  const { asFragment } = render(<Forest />);
  expect(asFragment).toMatchSnapshot();
});
