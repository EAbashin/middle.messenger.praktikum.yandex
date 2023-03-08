import { PathRouter } from '../Router/PathRouter';

describe('PathRouter', () => {
  test('should change history state', () => {
    const router = new PathRouter();
    const history = global.window.history;

    router.go('/messenger');
    expect(history.length).toEqual(2);

    router.go('/sign-in');
    expect(history.length).toEqual(3);
  });
});
