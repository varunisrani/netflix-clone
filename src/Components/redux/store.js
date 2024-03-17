// store.js
import { createStore } from "redux";
import movieReducer from "../redux/reducer";

const store = createStore(movieReducer);

export default store;
