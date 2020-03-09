import { AuthGuard } from './auth.guard';
describe('AuthGuard', () => {
    const authGuard: AuthGuard = new AuthGuard();

    it('should canActivate return true for a logged in user', async () => {
      localStorage.setItem('username', 'xyz');
      let actual;
      await authGuard.canActivate().then(v => actual = v);
      expect(actual).toEqual(true);
    });

    it('should canActivate return false for a logged out user', async () => {
      localStorage.removeItem('username');
      let actual;
      await authGuard.canActivate().then(v => actual = v);
      expect(actual).toEqual(false);
    });

    it('should canLoad return true for a logged in user', async () => {
      localStorage.setItem('username', 'xyz');
      let actual;
      await authGuard.canLoad().then(v => actual = v);
      expect(actual).toEqual(true);
    });

    it('should canLoad return false for a logged out user', async () => {
      localStorage.removeItem('username');
      let actual;
      await authGuard.canLoad().then(v => actual = v);
      expect(actual).toEqual(false);
    });
});
