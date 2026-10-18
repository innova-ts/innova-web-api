import { Controller, Get } from '@nestjs/common';
import { CommentsService } from './comments.service.js';
import { I18nLang } from 'nestjs-i18n';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('bests')
  public bests(@I18nLang() lang:string) {
    return this.commentsService.bests(lang);
  }

  @Get('happier-companies')
  public happierCompanies(@I18nLang() lang:string) {
    return this.commentsService.listHappierCompanies(lang);
  }
}
