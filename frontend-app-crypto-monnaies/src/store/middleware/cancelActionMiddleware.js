import React from "react";

export const cancelActionMiddleware = (store) => (next) => (action) => {
  if (action.cancel) {
    return;
  }

  next(action);
};
