import React from 'react';

import { Link } from 'gatsby';

const pageStyles = {
  color: '#232129',
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif'
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 32,
  maxWidth: 320
};

const HomePage = (): JSX.Element => (
  <main style={pageStyles}>
    <h1 style={headingStyles}>Choose a challenge:</h1>
    <ul>
      <li>
        <Link to="/countries">Countries</Link>
      </li>
      <li>
        <Link to="/bucket">Bucket</Link>
      </li>
      <li>
        <Link to="/promo">Promo</Link>
      </li>
    </ul>
  </main>
);

export default HomePage;
