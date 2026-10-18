import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../../supabase/supabase.module.js';
import { Comment } from './entities/comment.entity.js';
import { HappyCompany } from './entities/happy-company.entity.js';

@Injectable()
export class CommentsService {

    public constructor(
        @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient
    ) {}

    /**
     * Returns the best comments based on their rating
     * @param lang Language code (see docs)
     * @returns Array of best comments
     */
    public async bests(lang:string): Promise<Comment[]> {
        const { data:comments } = await this.supabase.rpc('list_best_comments', { p_lang: lang, p_top: 4 });
        return comments as Comment[];
    }

    /**
     * Returns the companies with the most positive comments
     * @param lang Language code (see docs)
     * @returns Array of companies with the most positive comments
     */
    public async listHappierCompanies(lang:string): Promise<HappyCompany[]> {
        const { data:companies } = await this.supabase.rpc('list_happier_companies', { p_lang: lang, p_top: 6 });
        return companies as HappyCompany[];
    }
}
