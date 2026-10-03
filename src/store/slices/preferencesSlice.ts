import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  darkMode: boolean;
  categories: string[];
  favorites: string[];
}

const initialState: PreferencesState = {
  darkMode: true,
  categories: ['technology', 'sports', 'entertainment', 'finance'],
  favorites: [],
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
  },
});

export const { toggleDarkMode, setCategories, toggleFavorite } = preferencesSlice.actions;
export default preferencesSlice.reducer;
