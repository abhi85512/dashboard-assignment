import reducer, { toggleDarkMode, setCategories, toggleFavorite } from '../store/slices/preferencesSlice';

describe('preferencesSlice', () => {
  const initialState = {
    darkMode: true,
    categories: ['technology', 'sports', 'entertainment', 'finance'],
    favorites: [],
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle toggleDarkMode', () => {
    const actual = reducer(initialState, toggleDarkMode());
    expect(actual.darkMode).toEqual(false);
  });

  it('should handle setCategories', () => {
    const actual = reducer(initialState, setCategories(['sports']));
    expect(actual.categories).toEqual(['sports']);
  });

  it('should handle toggleFavorite (add)', () => {
    const actual = reducer(initialState, toggleFavorite('item-1'));
    expect(actual.favorites).toEqual(['item-1']);
  });

  it('should handle toggleFavorite (remove)', () => {
    const stateWithFavorite = { ...initialState, favorites: ['item-1'] };
    const actual = reducer(stateWithFavorite, toggleFavorite('item-1'));
    expect(actual.favorites).toEqual([]);
  });
});
