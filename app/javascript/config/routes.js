import React from "react";
import { lazy } from "react";

const RequestQuote = lazy(() => import("pages/RequestQuote/RequestQuote"));
const QuoteSimulation = lazy(() => import("pages/QuoteSimulation/QuoteSimulation"));
const NotFound = lazy(() => import("pages/NotFound/NotFound"))

export const routeList = [
   {
    path: "/",
    component: <RequestQuote/>,
    exact: true,
  },
   {
    path: "/quote-simulation/:id",
    component: <QuoteSimulation/>,
    exact: true,
  },
   {
    path: "*",
    component: <NotFound />,
    exact: true
  },
];
