import { create } from 'zustand';
import type { ElementKey } from '../core/saju/types';

export interface CollectionStoreState {
  checkInDates: string[];
  talismans: string[];
  elementOrbs: ElementKey[];
  completedMissionIds: string[];
  markTodayCheckIn: (date: string) => void;
  completeMission: (missionId: string) => void;
}

export const useCollectionStore = create<CollectionStoreState>(set => ({
  checkInDates: [],
  talismans: ['starter-red-talisman'],
  elementOrbs: [],
  completedMissionIds: [],
  markTodayCheckIn: date =>
    set(state => ({
      checkInDates: state.checkInDates.includes(date)
        ? state.checkInDates
        : [...state.checkInDates, date],
    })),
  completeMission: missionId =>
    set(state => ({
      completedMissionIds: state.completedMissionIds.includes(missionId)
        ? state.completedMissionIds
        : [...state.completedMissionIds, missionId],
    })),
}));
