import React from 'react';
import { Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { PrivacyPolicyScreen } from '../../src/screens/PrivacyPolicyScreen';

describe('PrivacyPolicyScreen', () => {
  it('renders app registration privacy policy sections', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <PrivacyPolicyScreen
          navigation={{} as never}
          route={{ name: 'PrivacyPolicy', params: undefined } as never}
        />,
      );
    });

    const text = renderer!.root.findAllByType(Text).map(node => node.props.children).join(' ');

    expect(text).toContain('운명전 개인정보처리방침');
    expect(text).toContain('수집하는 정보');
    expect(text).toContain('기기 내 저장');
    expect(text).toContain('제3자 SDK');
    expect(text).toContain('문의');
    expect(text).toContain('young02hwi@gmail.com');
    expect(text).not.toContain('support@app101.local');
    expect(text).not.toContain('출시 전');
  });
});
