import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { listProductsReducer } from "./reducers/productReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

const reducers = combineReducers({
  listProducts: listProductsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const middleware = [thunk];

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
