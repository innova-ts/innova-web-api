import { Inject, Injectable } from '@nestjs/common';
import { UpdateMetricDto } from './dto/update-metric.dto.js';
import { SupabaseClient } from '@supabase/supabase-js';
import { Metric } from './entities/metric.entity.js';
import { SUPABASE_CLIENT } from '../../supabase/supabase.module.js';

@Injectable()
export class MetricsService {

  public constructor(
    @Inject(SUPABASE_CLIENT)  private readonly supabase: SupabaseClient,
  ) {}

  public async findAll(lang:string): Promise<Metric[]> {
    const { data: metrics } = await this.supabase.rpc('get_metrics', {
      p_lang: lang
    });

    return metrics as Metric[];
  }

  update(id: number, updateMetricDto: UpdateMetricDto) {
    return `This action updates a #${id} metric, the method logic would be applied soon`;
  }

}
