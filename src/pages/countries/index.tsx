import React from 'react';

import { graphql } from 'gatsby';

import * as styles from './index.module.scss';
import CountryCard from '../../components/CountryCard';
import { CountriesPageQuery } from '../../types/Country';
import { slugify } from '../../utils/slugify';

interface CountriesPageProps {
  data: CountriesPageQuery;
}

const CountriesPage = ({ data }: CountriesPageProps) => {
  const countries = data.allCountries.nodes;

  return (
    <div className={styles.container}>
      <h1 style={{ marginTop: '32px' }}>All Countries</h1>
      <ul className={styles.grid}>
        {countries.map((country) => (
          <CountryCard country={country} key={slugify(country.name.common)} />
        ))}
      </ul>
    </div>
  );
};

export default CountriesPage;

export const query = graphql`
  query {
    allCountries {
      nodes {
        name {
          common
        }
        capital
        region
        population
        flags {
          png
        }
        maps {
          googleMaps
        }
      }
    }
  }
`;
