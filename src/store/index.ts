import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {Store} from 'redux';
import uiReducer, { UiState } from './uiSlice';
import { persistStore, persistReducer } from 'redux-persist'
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
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import rs485Slice, { Rs485State } from './rs485Slice';
import vcomSlice, { VCOMState } from './vcomSlice';
import groupsSlice, { GroupsState } from './groupsSlice';
import plotSlice, { PlotState } from './plotSlice';

interface AppStore {
  ui: UiState,
  rs485: Rs485State
  vcom: VCOMState,
  groups: GroupsState,
  plot: PlotState
}

const rootReducer = combineReducers({
  ui: uiReducer,
  rs485: rs485Slice,
  vcom: vcomSlice,
  groups: groupsSlice,
  plot: plotSlice
})

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["rs485", "vcom", 'ui'],
  transforms: [createWhitelistFilter('ui', ["selectedDecoderType"]),]
}

const persistedReducer = persistReducer<AppStore, any>(persistConfig, rootReducer)

export const store : Store<AppStore, any>= configureStore({
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