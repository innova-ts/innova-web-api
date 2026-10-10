import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service.js';
import { Metric } from './entities/metric.entity.js';
import { buildSupabaseTestingProvider } from '../../supabase/supabase.module.js';

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricsService, buildSupabaseTestingProvider()],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
