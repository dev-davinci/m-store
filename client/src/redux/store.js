import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { listProductsReducer } from "./reducers/productReducers";

const reducers = combineReducers({
  listProducts: listProductsReducer,
});

const middleware = [thunk];

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
