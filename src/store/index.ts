import { combineReducers, configureStore } from '@reduxjs/toolkit';
import uiReducer, { UiState } from './uiSlice';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createFilter, { createWhitelistFilter } from 'redux-persist-transform-filter';

interface AppStore {
  ui: UiState
}

const rootReducer = combineReducers({
  ui: uiReducer,
})

const persitingReducers = createFilter(
  `ui.streaming`
);

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  transforms: [createWhitelistFilter('ui', ["streaming"]),]
} 

const persistedReducer = persistReducer<AppStore, any>(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;