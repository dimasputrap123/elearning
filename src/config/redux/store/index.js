import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../reducer/authReducer";
import stateReducer from "../reducer/stateReducer";
import logic from "../../logic";
import { createLogicMiddleware } from "redux-logic";
import { enableBatching } from "redux-batched-actions";
import roomReducer from "../reducer/roomReducer";
import roomPersistReducer from "../reducer/roomPersistReducer";
// const logicMiddleware = createLogicMiddleware(logic);
let logicMiddleware = [];
for (let i = 0; i < logic.length; i++) {
  logicMiddleware.push(createLogicMiddleware(logic[i]));
}
const rootReducer = combineReducers({
  authReducer: authReducer,
  stateReducer: stateReducer,
  roomReducer: roomReducer,
  roomPersistReducer: roomPersistReducer,
});

const persistConfig = {
  key: "93F35B4973155",
  storage,
  whitelist: ["authReducer", "roomPersistReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  enableBatching(persistedReducer),
  compose(
    // applyMiddleware(logicMiddleware),
    applyMiddleware(...logicMiddleware),
    composeWithDevTools(applyMiddleware())
  )
);

const persistor = persistStore(store);
export { store, persistor };
