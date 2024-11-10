import React, { FC } from 'react';

import { render, fireEvent } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';

import mockProducts from './db.json';
import { useProducts } from '../src/hooks/useProducts';
import Promo from '../src/pages/promo';

const mockedUseProduct = useProducts as jest.Mock<object>;

jest.mock('../src/hooks/useProducts');
jest.mock('../src/images/logo.svg', () => 'test-logo-path');

interface Props {
  children: JSX.Element;
}

const QueryWrapper: FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('promo page', () => {
  beforeEach(() => {
    mockedUseProduct.mockImplementation(() => ({ isLoading: true }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without errors', async () => {
    expect.assertions(0);

    render(
      <QueryWrapper>
        <Promo />
      </QueryWrapper>
    );
  });

  it('render a checkout button', async () => {
    expect.assertions(1);
    const { getByText } = render(
      <QueryWrapper>
        <Promo />
      </QueryWrapper>
    );

    expect(getByText('Checkout')).toBeInTheDocument();
  });

  it('should default to 5 mins', async () => {
    expect.assertions(1);
    const { getByText } = render(
      <QueryWrapper>
        <Promo />
      </QueryWrapper>
    );

    expect(getByText(/5:00/i)).toBeInTheDocument();
  });

  it('should show 10 products', async () => {
    expect.assertions(1);
    mockedUseProduct.mockImplementation(() => ({ isLoading: false, data: mockProducts }));

    const { getAllByRole } = render(
      <QueryWrapper>
        <Promo />
      </QueryWrapper>
    );

    expect(getAllByRole('listitem')).toHaveLength(10);
  });

  test('should render the header with logo and countdown', () => {
    const { getByAltText, getByText } = render(<Promo />);

    expect(getByAltText('Firstleaf')).toBeInTheDocument();
    expect(getByText(/Reserving your wines for/i)).toBeInTheDocument();
    expect(getByText('Checkout')).toBeInTheDocument();
  });

  test('should render all filter buttons', () => {
    const { getByText } = render(<Promo />);

    expect(getByText('All')).toBeInTheDocument();
    expect(getByText('Red Wine')).toBeInTheDocument();
    expect(getByText('White Wine')).toBeInTheDocument();
  });

  test('should filter white wines correctly', async () => {
    mockedUseProduct.mockImplementation(() => ({ isLoading: false, data: mockProducts }));
    const { getByText, queryByText } = render(<Promo />);

    const whiteWineButton = getByText('White Wine');
    fireEvent.click(whiteWineButton);

    expect(getByText('Cartesian 2020 Sauvignon Blanc California')).toBeInTheDocument();
    expect(
      queryByText('Miguel Aime Pouget 2020 Limited Release Malbec Mendoza, Argentina')
    ).not.toBeInTheDocument();
  });

  test('should filter red wines correctly', () => {
    mockedUseProduct.mockImplementation(() => ({ isLoading: false, data: mockProducts }));

    const { getByText, queryByText } = render(<Promo />);

    const redWineButton = getByText('Red Wine');
    fireEvent.click(redWineButton);

    expect(queryByText('Cartesian 2020 Sauvignon Blanc California')).not.toBeInTheDocument();
    expect(
      getByText('Miguel Aime Pouget 2020 Limited Release Malbec Mendoza, Argentina')
    ).toBeInTheDocument();
  });

  test('should filter all products when clicking All button', () => {
    mockedUseProduct.mockImplementation(() => ({ isLoading: false, data: mockProducts }));
    const { getByText } = render(<Promo />);

    const redWineButton = getByText('Red Wine');
    fireEvent.click(redWineButton);

    const allButton = getByText('All');
    fireEvent.click(allButton);

    expect(getByText('Cartesian 2020 Sauvignon Blanc California')).toBeInTheDocument();
    expect(
      getByText('Miguel Aime Pouget 2020 Limited Release Malbec Mendoza, Argentina')
    ).toBeInTheDocument();
  });

  test('should show all products initially', () => {
    mockedUseProduct.mockImplementation(() => ({ isLoading: false, data: mockProducts }));
    const { getByText } = render(<Promo />);

    expect(getByText('Cartesian 2020 Sauvignon Blanc California')).toBeInTheDocument();
    expect(
      getByText('Miguel Aime Pouget 2020 Limited Release Malbec Mendoza, Argentina')
    ).toBeInTheDocument();
  });
});
