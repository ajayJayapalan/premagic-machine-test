import { init } from "@rematch/core";
import { viewer } from "./models/viewer";


export const store = init({
  models: {
    viewer,
  },
});
