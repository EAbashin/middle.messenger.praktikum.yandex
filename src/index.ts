import {
  registerComponent, PathRouter, CoreRouter, Store,
} from 'core';
import { initApp } from './services/initApp';
import { defaultState } from './store';
import { initRouter } from './router';

import * as components from './components';

import './styles/styles.scss';

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

declare global {
  interface Window {
    store: Store<AppState>;
    router: CoreRouter;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new PathRouter();

  /**
     * Помещаем роутер и стор в глобальную область для доступа в хоках with*
     * @warning Не использовать такой способ на реальный проектах
     */
  window.router = router;
  window.store = store;

  store.on('changed', (_prevState, nextState) => {
    if (process.env.DEBUG) {
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
    }
  });

  /**
     * Инициализируем роутер
     */
  initRouter(router, store);

  /**
     * Загружаем данные для приложения
     */
  store.dispatch(initApp);
});
