import React from 'react';
import { Pressable } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { HomeScreen } from '../../src/screens/HomeScreen';

describe('HomeScreen fortune menu', () => {
  it('exposes the privacy policy from the first screen', async () => {
    const navigation = { navigate: jest.fn() };
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <HomeScreen navigation={navigation as never} route={{ name: 'Home', params: undefined } as never} />,
      );
    });

    const privacyButton = renderer!.root
      .findAllByType(Pressable)
      .find(
        node =>
          node.props.accessibilityRole === 'button' &&
          node.props.accessibilityLabel === '개인정보처리방침',
      );

    expect(privacyButton).toBeTruthy();

    await ReactTestRenderer.act(() => {
      privacyButton!.props.onPress();
    });

    expect(navigation.navigate).toHaveBeenCalledWith('PrivacyPolicy');
  });

  it.each([
    ['직장운', 'work'],
    ['건강운', 'health'],
    ['로또번호 운세', 'lotto'],
  ])('navigates from %s menu item to birth input', async (label, categoryId) => {
    const navigation = { navigate: jest.fn() };
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <HomeScreen navigation={navigation as never} route={{ name: 'Home', params: undefined } as never} />,
      );
    });

    const menuButton = renderer!.root
      .findAllByType(Pressable)
      .find(node => node.props.accessibilityRole === 'button' && node.props.accessibilityLabel === label);

    expect(menuButton).toBeTruthy();

    await ReactTestRenderer.act(() => {
      menuButton!.props.onPress();
    });

    expect(navigation.navigate).toHaveBeenCalledWith('BirthInput', {
      categoryId,
      categoryLabel: label,
    });
  });
});
