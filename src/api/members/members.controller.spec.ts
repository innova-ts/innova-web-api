import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from './members.controller.js';
import { MembersService } from './members.service.js';
import { buildSupabaseTestingProvider } from '../../supabase/supabase.module.js';

describe('MembersController', () => {
  let controller: MembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [MembersService, buildSupabaseTestingProvider()],
    }).compile();

    controller = module.get<MembersController>(MembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
