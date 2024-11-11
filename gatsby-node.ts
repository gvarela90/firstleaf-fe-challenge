import path from 'path';

import { CreateNodeArgs, CreatePagesArgs } from 'gatsby';

import { Country } from './src/types/Country';
import { slugify } from './src/utils/slugify';

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }: CreateNodeArgs) => {
  const { createNode } = actions;

  try {
    // eslint-disable-next-line no-console
    console.log('Fetching countries');
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries: Country[] = await response.json();
    // eslint-disable-next-line no-console
    console.log(`${countries.length} countries found`);
    countries.sort((countryA, countryB) =>
      countryA.name.common.localeCompare(countryB.name.common)
    );

    countries.forEach((country) => {
      const nodeContent = JSON.stringify(country);
      createNode({
        ...country,
        id: createNodeId(`country-${country.name.common}`),
        parent: null,
        children: [],
        internal: {
          type: 'Countries',
          mediaType: 'application/json',
          content: nodeContent,
          contentDigest: createContentDigest(country)
        }
      });
    });
  } catch (error) {
    console.error('Error while fetching countries:', error);
  }
};

interface AllCountriesQuery {
  allCountries: {
    nodes: Country[];
  };
}

export const createPages = async ({ actions, graphql }: CreatePagesArgs) => {
  const result = await graphql<AllCountriesQuery>(`
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
  `);

  const countries = result?.data?.allCountries.nodes as Country[];
  countries.forEach((country: Country) => {
    actions.createPage({
      path: `/countries/${slugify(country.name.common)}`,
      component: path.resolve('./src/templates/Country/index.tsx'),
      context: { country }
    });
  });
};
