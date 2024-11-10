import React from 'react';

import { Link } from 'gatsby';

import * as styles from './index.module.scss';
import { Country } from '../../types/Country';
import { slugify } from '../../utils/slugify';

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <Link
      key={country.name.common}
      to={`/countries/${slugify(country.name.common)}`}
      className={styles.CountryCard}
    >
      <img className={styles.flag} src={country.flags.png} alt={`${country.name.common}`} />
      <h2 className={styles.title}>{country.name.common}</h2>
      <p>Region: {country.region}</p>
      {country.capital && <p>Capital: {country.capital[0]}</p>}
      <p>Population: {new Intl.NumberFormat().format(country.population)}</p>
    </Link>
  );
};

export default CountryCard;
