import React, { useState } from "react";

//Redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import UserReducer from "./Store/Reducers/UserReducer";

//Font
import * as Font from "expo-font"; //
import { AppLoading } from "expo"; //
import ImportedFonts from "./assets/Fonts/ImportedFonts";

//Navigator
import Drawer from "./Navigation/Drawer";
import UserAuthen from "./Navigation/UserAuthen";
import Main from "./Navigation/Main";

const fetchFonts = () => {
  return Font.loadAsync(ImportedFonts);
};

export default function App() {
  const rootReducer = combineReducers({
    user: UserReducer,
  });

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );

  ////////////////////////////////////////////////////////////////  LoadFont
  const [fontLoded, setFontLoaded] = useState(false);
  if (!fontLoded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  ////////////////////////////////////////////////////////////////  LoadFont

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
