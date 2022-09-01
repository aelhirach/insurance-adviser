import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeList } from "./config/routes";
import { ThemeProvider } from "@material-ui/styles";
import { StylesProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

const App = () => {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
            <Suspense fallback={<h1>Loading Home...</h1>}>
            <BrowserRouter>
              <Routes>
                  {routeList.map(({ path, exact, component }, index) => (
                       <Route key={index} path={path} exact={exact} element={component}/>
                  ))}
              </Routes>
            </BrowserRouter>
            </Suspense>
        </StylesProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
