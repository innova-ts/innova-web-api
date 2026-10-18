import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MembersModule } from './api/members/members.module.js';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module.js';
import { I18nModule } from './settings/modules/i18n.js';
import { MetricsModule } from './api/metrics/metrics.module.js';
import { CommentsModule } from './api/comments/comments.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    I18nModule,
    SupabaseModule, 
    MembersModule, MetricsModule, CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
