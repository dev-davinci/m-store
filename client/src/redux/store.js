import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { listProductsReducer } from "./reducers/productReducers";
import { userLoginReducer } from "./reducers/userReducers";

const reducers = combineReducers({
  listProducts: listProductsReducer,
  userLogin: userLoginReducer,
});

const middleware = [thunk];

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
