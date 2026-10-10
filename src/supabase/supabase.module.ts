import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_CLIENT = 'SUPABASE_CLIENT';

const Providers: Record<string, string> = {
    'testing': '',
    'standar': ''
};

function buildProvider(env: keyof typeof Providers) {
    return {
        provide: SUPABASE_CLIENT,
        inject: [ConfigService],
        useFactory: (configService: ConfigService): SupabaseClient => {
            const url = configService.get<string>(`${Providers[env]}SUPABASE_URL`);
            const key = configService.get<string>(`${Providers[env]}SUPABASE_KEY`);

            if (!url || !key) {
                throw new Error('You have to define SUPABASE_URL and SUPABASE_KEY env variables');
            }

            return createClient(url, key);
        },
    };
}

@Global()
@Module({
    providers: [
        buildProvider('standar')
    ],
    exports: [SUPABASE_CLIENT]
})
export class SupabaseModule { }

export const buildSupabaseTestingProvider = () => {
    return {
        provide: SUPABASE_CLIENT,
        useValue: {}
    };
}
