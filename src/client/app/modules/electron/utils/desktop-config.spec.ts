import { t } from '../../test/index';
import { DesktopConfig } from './desktop-config';

export function main() {
  t.describe('electron: DesktopConfig', () => {

    t.it('GET_SUPPORTED_LANGUAGES', () => {
      const languages = DesktopConfig.GET_SUPPORTED_LANGUAGES();
      t.e(languages.length).toBe(2);
      t.e(languages[0].code).toBe('en');
      t.e(languages[1].code).toBe('es');
    });
  });
}
