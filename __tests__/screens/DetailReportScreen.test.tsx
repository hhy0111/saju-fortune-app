import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { DetailReportScreen } from '../../src/screens/DetailReportScreen';
import { useFortuneStore } from '../../src/store/fortuneStore';

const birthInput = {
  birthDate: '1990-05-17',
  birthHour: 9,
  calendarType: 'solar' as const,
  gender: 'unspecified' as const,
  saveConsent: false,
};

describe('DetailReportScreen app scrolling', () => {
  beforeEach(() => {
    useFortuneStore.setState({
      currentInput: null,
      savedBirthInput: null,
      fortunesById: {},
      unlockedFortuneIds: [],
    });
  });

  it('keeps the back button and report title fixed while report content scrolls', async () => {
    const fortuneId = useFortuneStore
      .getState()
      .generateTodayFortune(birthInput, new Date('2026-06-08T00:00:00+09:00'));
    const navigation = {
      goBack: jest.fn(),
      navigate: jest.fn(),
    };
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <DetailReportScreen
          navigation={navigation as never}
          route={{ name: 'DetailReport', params: { fortuneId } } as never}
        />,
      );
    });

    const scrollView = renderer!.root.findByType(ScrollView);
    expect(scrollView.props.stickyHeaderIndices).toEqual([0]);
    expect(scrollView.props.directionalLockEnabled).toBe(true);

    const backButton = renderer!.root
      .findAllByType(Pressable)
      .find(node => node.props.accessibilityRole === 'button' && node.props.accessibilityLabel === '뒤로가기');
    expect(backButton).toBeTruthy();

    await ReactTestRenderer.act(() => {
      backButton!.props.onPress();
    });

    expect(navigation.goBack).toHaveBeenCalledTimes(1);
    expect(
      renderer!.root
        .findAllByType(Text)
        .some(node => node.props.children === '상세 리포트'),
    ).toBe(true);
  });
});
