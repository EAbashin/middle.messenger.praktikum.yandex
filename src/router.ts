import { Store, renderDOM, CoreRouter } from 'core';
import { getScreenComponent, Screens } from './utils';

const routes = [
  {
    path: '*',
    block: Screens.Messenger,
    shouldAuthorized: true,
  },
  {
    path: '/messenger',
    block: Screens.Messenger,
    shouldAuthorized: true,
  },
  {
    path: '/sign-up',
    block: Screens.SignUp,
    shouldAuthorized: false,
  },
  {
    path: '/sign-in',
    block: Screens.SignIn,
    shouldAuthorized: false,
  },
  {
    path: '/profile',
    block: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: '/settings',
    block: Screens.Settings,
    shouldAuthorized: true,
  },
  {
    path: '/change-password',
    block: Screens.Settings,
    shouldAuthorized: true,
  },
];

export function initRouter(router: CoreRouter, store: Store<AppState>) {
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);

      console.log('screen', route.path);

      if (isAuthorized && (route.path === '/sign-in' || route.path === '/sign-up')) {
        store.dispatch({ screen: Screens.Messenger });
      } else if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block });
        return;
      } else if (!currentScreen) {
        store.dispatch({ screen: Screens.SignIn });
      }
    });
  });

  /**
     * Глобальный слушатель изменений в сторе
     * для переключения активного экрана
     */
  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }

    if (prevState.screen !== nextState.screen && nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
      document.title = `App / ${Page.componentName}`;
    }
  });
}
