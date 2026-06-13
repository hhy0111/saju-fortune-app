import { useFortuneStore } from '../../src/store/fortuneStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const birthInput = {
  birthDate: '1990-05-17',
  birthHour: 9,
  calendarType: 'solar' as const,
  gender: 'unspecified' as const,
  saveConsent: false,
};

describe('fortuneStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useFortuneStore.setState({
      currentInput: null,
      fortunesById: {},
      unlockedFortuneIds: [],
      savedBirthInput: null,
    });
  });

  it('generates and stores a fortune result', () => {
    const fortuneId = useFortuneStore.getState().generateTodayFortune(birthInput, new Date('2026-06-07'));

    expect(fortuneId).toBeTruthy();
    expect(useFortuneStore.getState().fortunesById[fortuneId]).toBeTruthy();
  });

  it('does not save birth input without consent', () => {
    useFortuneStore.getState().setBirthInput(birthInput);

    expect(useFortuneStore.getState().currentInput).toEqual(birthInput);
    expect(useFortuneStore.getState().savedBirthInput).toBeNull();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('saves birth input only with consent', () => {
    const consentInput = { ...birthInput, saveConsent: true };

    useFortuneStore.getState().setBirthInput(consentInput);

    expect(useFortuneStore.getState().savedBirthInput).toEqual(consentInput);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'saju.birthInput',
      JSON.stringify(consentInput),
    );
  });

  it('unlocks a generated fortune', () => {
    const fortuneId = useFortuneStore.getState().generateTodayFortune(birthInput, new Date('2026-06-07'));

    useFortuneStore.getState().unlockFortune(fortuneId);

    expect(useFortuneStore.getState().unlockedFortuneIds).toContain(fortuneId);
  });
});
