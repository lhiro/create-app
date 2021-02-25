import { create } from 'dva-core';
import createLoading from 'dva-loading';

let app;
let store;
let dispatch;

function createApp(option) {
  app = create(option);
  app.use(createLoading({}));

  if (!global['registered']) option.models.forEach(model => app.model(model));

  global['registered'] = true;

  app.start();

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;
  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  }
}