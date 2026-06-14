import React from 'react';
import { Pressable, Text, TextInput } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { BirthInputScreen } from '../../src/screens/BirthInputScreen';

function flattenText(value: React.ReactNode): string {
  if (Array.isArray(value)) {
    return value.map(flattenText).join('');
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  return '';
}

function renderTextContent(renderer: ReactTestRenderer.ReactTestRenderer): string {
  return renderer.root
    .findAllByType(Text)
    .map(node => flattenText(node.props.children))
    .join(' ');
}

function pressableIncludesText(node: ReactTestRenderer.ReactTestInstance, label: string): boolean {
  return node.findAllByType(Text).some(textNode => flattenText(textNode.props.children).includes(label));
}

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

  it('lets users jump calendar years without stepping month by month', async () => {
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

    const firstSelectButton = renderer!.root.findAllByType(Pressable)[0];

    await ReactTestRenderer.act(() => {
      firstSelectButton.props.onPress();
    });

    const tenYearsBackButton = renderer!.root
      .findAllByType(Pressable)
      .find(node => pressableIncludesText(node, '-10년'));
    const oneYearBackButton = renderer!.root
      .findAllByType(Pressable)
      .find(node => pressableIncludesText(node, '-1년'));
    const oneYearForwardButton = renderer!.root
      .findAllByType(Pressable)
      .find(node => pressableIncludesText(node, '+1년'));
    const tenYearsForwardButton = renderer!.root
      .findAllByType(Pressable)
      .find(node => pressableIncludesText(node, '+10년'));

    expect(renderTextContent(renderer!)).toContain('1990년');
    expect(tenYearsBackButton).toBeTruthy();
    expect(oneYearBackButton).toBeTruthy();
    expect(oneYearForwardButton).toBeTruthy();
    expect(tenYearsForwardButton).toBeTruthy();

    await ReactTestRenderer.act(() => {
      tenYearsBackButton!.props.onPress();
    });

    expect(renderTextContent(renderer!)).toContain('1980년');
  });
});
