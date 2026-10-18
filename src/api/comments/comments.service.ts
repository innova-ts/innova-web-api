import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../../supabase/supabase.module.js';
import { Comment } from './entities/comment.entity.js';

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
}
