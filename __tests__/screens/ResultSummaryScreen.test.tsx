import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { ResultSummaryScreen } from '../../src/screens/ResultSummaryScreen';
import { useFortuneStore } from '../../src/store/fortuneStore';

const birthInput = {
  birthDate: '1990-05-17',
  birthHour: 9,
  birthMinute: 0,
  calendarType: 'solar' as const,
  gender: 'unspecified' as const,
  saveConsent: false,
};

describe('ResultSummaryScreen app scrolling and lotto placement', () => {
  beforeEach(() => {
    ReactTestRenderer.act(() => {
      useFortuneStore.setState({
        currentInput: null,
        savedBirthInput: null,
        fortunesById: {},
        unlockedFortuneIds: [],
      });
    });
  });

  it('keeps the result header fixed and hides the native scroll indicator', async () => {
    let fortuneId = '';
    await ReactTestRenderer.act(() => {
      fortuneId = useFortuneStore
        .getState()
        .generateTodayFortune(birthInput, new Date('2026-06-08T00:00:00+09:00'));
    });
    const navigation = { navigate: jest.fn(), goBack: jest.fn() };
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <ResultSummaryScreen
          navigation={navigation as never}
          route={{ name: 'ResultSummary', params: { fortuneId, categoryId: 'today', categoryLabel: '오늘의 운세' } } as never}
        />,
      );
    });

    const scrollView = renderer!.root.findByType(ScrollView);
    expect(scrollView.props.stickyHeaderIndices).toEqual([0]);
    expect(scrollView.props.showsVerticalScrollIndicator).toBe(false);

    const backButton = renderer!.root
      .findAllByType(Pressable)
      .find(node => node.props.accessibilityRole === 'button' && node.props.accessibilityLabel === '뒤로가기');

    expect(backButton).toBeTruthy();
    expect(
      renderer!.root.findAllByType(Text).some(node => node.props.children === '오늘의 결과'),
    ).toBe(true);
  });

  it('shows lotto numbers only for the lotto fortune category', async () => {
    let fortuneId = '';
    await ReactTestRenderer.act(() => {
      fortuneId = useFortuneStore
        .getState()
        .generateTodayFortune(birthInput, new Date('2026-06-08T00:00:00+09:00'));
    });
    const navigation = { navigate: jest.fn(), goBack: jest.fn() };
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <ResultSummaryScreen
          navigation={navigation as never}
          route={{ name: 'ResultSummary', params: { fortuneId, categoryId: 'today', categoryLabel: '오늘의 운세' } } as never}
        />,
      );
    });

    expect(
      renderer!.root.findAllByType(Text).some(node => node.props.children === '이번주 로또 행운'),
    ).toBe(false);

    await ReactTestRenderer.act(() => {
      renderer!.update(
        <ResultSummaryScreen
          navigation={navigation as never}
          route={{ name: 'ResultSummary', params: { fortuneId, categoryId: 'lotto', categoryLabel: '로또번호 운세' } } as never}
        />,
      );
    });

    expect(
      renderer!.root.findAllByType(Text).some(node => node.props.children === '이번주 로또 행운'),
    ).toBe(true);
  });
});
