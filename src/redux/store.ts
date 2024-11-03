import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import employeeReducer from './slices/employeeSlice';
import evaluationReducer from './slices/evaluationSlice';
import reportReducer from './slices/reportSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] //only auth data will be persisted
};

const rootReducer = combineReducers({
    auth: authReducer,
    employees: employeeReducer,
    evaluations: evaluationReducer,
    report: reportReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
