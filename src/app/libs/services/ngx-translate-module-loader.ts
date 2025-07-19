
import { HttpClient } from '@angular/common/http';
import { IModuleTranslationOptions, ModuleTranslateLoader } from '@larscom/ngx-translate-module-loader';

export function moduleHttpLoaderFactory(http: HttpClient) {
  const baseTranslateUrl = './assets/i18n';
  const moduleNames = [
    'menu',
    // 'role',
    // 'permission',
    // 'select',
    // 'tenant',
    // 'data-dictionary-group',
    // 'sys-setting',
    // 'sys-tool',
    // 'openiddict'
  ];
  const modules = moduleNames.map(name => {
    return { baseTranslateUrl, moduleName: name };
  });
  const options: IModuleTranslationOptions = {
    lowercaseNamespace: true,
    modules: [{ baseTranslateUrl }, ...modules],
  };

  return new ModuleTranslateLoader(http, options);
}
