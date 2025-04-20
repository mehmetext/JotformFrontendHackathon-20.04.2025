import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoritesState {
  items: string[];
}

interface FavoritesActions {
  toggleItem: (pid: string) => void;
}

export const useFavoritesStore = create<FavoritesState & FavoritesActions>()(
  persist(
    (set) => ({
      items: [],
      toggleItem: (pid) =>
        set((state) => {
          const existingItem = state.items.find((i) => i === pid);
          if (existingItem) {
            return {
              items: state.items.filter((i) => i !== pid),
            };
          }
          return { items: [...state.items, pid] };
        }),
    }),
    {
      name: "favorites",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
