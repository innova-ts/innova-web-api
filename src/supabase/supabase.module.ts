import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_CLIENT = 'SUPABASE_CLIENT';

@Global()
@Module({
    providers: [
        {
            provide: SUPABASE_CLIENT,
            inject: [ConfigService],
            useFactory: (configService: ConfigService): SupabaseClient => {
                const url = configService.get<string>('SUPABASE_URL');
                const key = configService.get<string>('SUPABASE_KEY');

                if (!url || !key) {
                    throw new Error('You have to define SUPABASE_URL and SUPABASE_KEY env variables');
                }

                return createClient(url, key);
            },
        },
    ],
    exports: [SUPABASE_CLIENT]
})
export class SupabaseModule { }
