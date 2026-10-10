import { Controller, Get, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { MetricsService } from './metrics.service.js';
import { UpdateMetricDto } from './dto/update-metric.dto.js';
import { I18nLang } from 'nestjs-i18n';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  public findAll(@I18nLang() lang:string) {
    return this.metricsService.findAll(lang);
  }

  @Patch(':id')
  public update(@Param('id', ParseIntPipe) id: number, @Body() updateMetricDto: UpdateMetricDto) {
    return this.metricsService.update(+id, updateMetricDto);
  }
}
