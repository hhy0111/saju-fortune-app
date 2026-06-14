import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { FortuneCard } from '../../src/components/FortuneCard';

describe('FortuneCard', () => {
  it('uses a stable view container instead of stretching a decorative panel behind content', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <FortuneCard title="오행 균형">
          <Text>본문</Text>
        </FortuneCard>,
      );
    });

    expect(renderer!.root.findAllByType(ImageBackground)).toHaveLength(0);
    expect(renderer!.root.findAllByType(View).length).toBeGreaterThan(0);
    expect(renderer!.root.findAllByType(Text).some(node => node.props.children === '오행 균형')).toBe(true);
    expect(renderer!.root.findAllByType(Text).some(node => node.props.children === '본문')).toBe(true);
  });
});
