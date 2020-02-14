import React from 'react';
import { render } from '@testing-library/react';
import Home from '.';
import { BrowserRouter } from "react-router-dom";

it('matches snapshot', () => {
  const { asFragment } = render(<BrowserRouter>
    <Home />
  </BrowserRouter>);
  expect(asFragment).toMatchSnapshot();
});
