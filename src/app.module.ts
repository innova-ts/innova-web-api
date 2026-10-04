import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MembersModule } from './api/members/members.module.js';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SupabaseModule, MembersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
