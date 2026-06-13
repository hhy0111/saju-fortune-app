import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { generateFortune } from '../core/fortune/generateFortune';
import type { FortuneResult } from '../core/fortune/types';
import type { BirthInput } from '../core/saju/types';

const BIRTH_INPUT_STORAGE_KEY = 'saju.birthInput';

function saveBirthInputToDevice(input: BirthInput) {
  AsyncStorage.setItem(BIRTH_INPUT_STORAGE_KEY, JSON.stringify(input)).catch(() => undefined);
}

function removeBirthInputFromDevice() {
  AsyncStorage.removeItem(BIRTH_INPUT_STORAGE_KEY).catch(() => undefined);
}

export interface FortuneStoreState {
  currentInput: BirthInput | null;
  savedBirthInput: BirthInput | null;
  fortunesById: Record<string, FortuneResult>;
  unlockedFortuneIds: string[];
  setBirthInput: (input: BirthInput) => void;
  generateTodayFortune: (input: BirthInput, today?: Date) => string;
  unlockFortune: (fortuneId: string) => void;
  clearSavedBirthInput: () => void;
}

export const useFortuneStore = create<FortuneStoreState>((set, get) => ({
  currentInput: null,
  savedBirthInput: null,
  fortunesById: {},
  unlockedFortuneIds: [],
  setBirthInput: input => {
    if (input.saveConsent) {
      saveBirthInputToDevice(input);
    }

    set({
      currentInput: input,
      savedBirthInput: input.saveConsent ? input : get().savedBirthInput,
    });
  },
  generateTodayFortune: (input, today = new Date()) => {
    const result = generateFortune(input, today);

    if (input.saveConsent) {
      saveBirthInputToDevice(input);
    }

    set(state => ({
      currentInput: input,
      savedBirthInput: input.saveConsent ? input : state.savedBirthInput,
      fortunesById: {
        ...state.fortunesById,
        [result.id]: result,
      },
    }));

    return result.id;
  },
  unlockFortune: fortuneId =>
    set(state => ({
      unlockedFortuneIds: state.unlockedFortuneIds.includes(fortuneId)
        ? state.unlockedFortuneIds
        : [...state.unlockedFortuneIds, fortuneId],
    })),
  clearSavedBirthInput: () => {
    removeBirthInputFromDevice();
    set({ savedBirthInput: null });
  },
}));
