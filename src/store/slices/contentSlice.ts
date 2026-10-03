import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchMockData, ContentItem } from '../../services/mockApi';

interface ContentState {
  items: ContentItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  hasMore: boolean;
  searchQuery: string;
}

const initialState: ContentState = {
  items: [],
  status: 'idle',
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: '',
};

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async ({ query, categories, page }: { query: string; categories: string[]; page: number }) => {
    const response = await fetchMockData(query, categories, page);
    return { data: response.data, hasMore: response.hasMore, page };
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.items = []; // reset items when query changes
      state.page = 1;
      state.hasMore = true;
    },
    resetContent: (state) => {
        state.items = [];
        state.page = 1;
        state.hasMore = true;
    },
    reorderContent: (state, action: PayloadAction<ContentItem[]>) => {
        state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.page === 1) {
            state.items = action.payload.data;
        } else {
            // append
            const newItems = action.payload.data.filter(
                newItem => !state.items.some(existing => existing.id === newItem.id)
            );
            state.items = [...state.items, ...newItems];
        }
        state.page = action.payload.page;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch content';
      });
  },
});

export const { setSearchQuery, resetContent, reorderContent } = contentSlice.actions;
export default contentSlice.reducer;
