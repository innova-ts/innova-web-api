import { AcceptLanguageResolver, HeaderResolver, I18nModule as I18nMod } from 'nestjs-i18n';
import { dirname, join } from 'path';
import { fileURLToPath } from 'node:url';

export const I18nModule = I18nMod.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: join(dirname(fileURLToPath(import.meta.url)), '../../i18n/'),
        watch: true,
      },
      resolvers: [
        new HeaderResolver(['x-lang']),
        AcceptLanguageResolver,
    ],
});