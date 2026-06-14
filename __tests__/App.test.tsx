/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import { useMonetizationStore } from '../src/store/monetizationStore';

let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

beforeEach(() => {
  useMonetizationStore.setState({
    premiumEntitlements: [],
    purchaseHistory: [],
    storeProducts: {},
    lastPurchaseStatus: 'idle',
  });
});

afterEach(async () => {
  if (renderer) {
    await ReactTestRenderer.act(() => {
      renderer!.unmount();
    });
    renderer = undefined;
  }
});

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });
});

test('loads saved premium purchases on startup', async () => {
  const loadSavedPurchases = jest.fn(() => Promise.resolve());
  useMonetizationStore.setState({ loadSavedPurchases });

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  expect(loadSavedPurchases).toHaveBeenCalledTimes(1);
});
