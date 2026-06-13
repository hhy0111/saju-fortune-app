import React from 'react';
import { Pressable, TextInput } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { BirthInputScreen } from '../../src/screens/BirthInputScreen';

describe('BirthInputScreen date and time controls', () => {
  it('uses calendar and select-style controls instead of free text birth date/time fields', async () => {
    const navigation = { navigate: jest.fn() };
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <BirthInputScreen
          navigation={navigation as never}
          route={{ name: 'BirthInput', params: undefined } as never}
        />,
      );
    });

    const buttons = renderer!.root.findAllByType(Pressable);

    expect(
      buttons.some(node => node.props.accessibilityLabel === '생년월일 선택'),
    ).toBe(true);
    expect(
      buttons.some(node => node.props.accessibilityLabel === '태어난 시간 선택'),
    ).toBe(true);
    expect(
      buttons.some(node => node.props.accessibilityLabel === '태어난 분 선택'),
    ).toBe(true);
    expect(renderer!.root.findAllByType(TextInput)).toHaveLength(0);
  });
});
