import React from "react";
import InnerWrapper from "./components/wrappers/InnerWrapper";
import store from "./redux/store";

export default function App() {
  return <InnerWrapper store={store} />;
}
