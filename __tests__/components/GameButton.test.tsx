import React from 'react';
import { Pressable } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { GameButton } from '../../src/components/GameButton';

describe('GameButton accessibility', () => {
  it('exposes button semantics and disabled state', async () => {
    const onPress = jest.fn();
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <GameButton label="결제하기" accessibilityHint="스토어 결제 화면으로 이동합니다." disabled onPress={onPress} />,
      );
    });

    const button = renderer!.root.findByType(Pressable);

    expect(button.props.accessibilityRole).toBe('button');
    expect(button.props.accessibilityLabel).toBe('결제하기');
    expect(button.props.accessibilityHint).toBe('스토어 결제 화면으로 이동합니다.');
    expect(button.props.accessibilityState).toEqual({ disabled: true, busy: false });

    await ReactTestRenderer.act(() => {
      button.props.onPress();
    });

    expect(onPress).not.toHaveBeenCalled();
  });
});
