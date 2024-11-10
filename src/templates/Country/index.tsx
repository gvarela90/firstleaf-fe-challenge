import React from 'react';
import { Link } from 'gatsby';
import * as styles from './index.module.scss';
import { Country } from '../../types/Country';

interface CountryTemplateProps {
  pageContext: { country: Country };
}

const CountryTemplate = ({ pageContext: { country } }: CountryTemplateProps) => {
  return (
    <div className={styles.container}>
      <Link to="/countries" className={styles.backLink}>
        Back to All Countries
      </Link>
      <div className={styles.content}>
        <img src={country.flags.png} alt={`${country.name.common}`} className={styles.flag} />
        <h1>{country.name.common}</h1>
        <div className={styles.details}>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          {country.capital && (
            <p>
              <strong>Capital:</strong> {country.capital[0]}
            </p>
          )}
          <p>
            <strong>Population:</strong> {new Intl.NumberFormat().format(country.population)}
          </p>
          {country.maps && (
            <a href={country.maps.googleMaps} target="_blank">
              View in maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryTemplate;
