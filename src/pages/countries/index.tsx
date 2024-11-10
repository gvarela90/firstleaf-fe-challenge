import React from 'react';
import { graphql } from 'gatsby';
import { CountriesPageQuery } from '../../types/Country';
import * as styles from './index.module.scss';
import CountryCard from '../../components/CountryCard';
import { slugify } from '../../utils/slugify';

interface CountriesPageProps {
  data: CountriesPageQuery;
}

const CountriesPage = ({ data }: CountriesPageProps) => {
  const countries = data.allCountries.nodes;

  return (
    <div className={styles.container}>
      <h1 style={{ marginTop: '32px' }}>All Countries</h1>
      <div className={styles.grid}>
        {countries.map((country) => (
          <CountryCard country={country} key={slugify(country.name.common)} />
        ))}
      </div>
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
