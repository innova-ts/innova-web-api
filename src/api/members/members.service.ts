import { Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';
import { SUPABASE_CLIENT } from '../../supabase/supabase.module.js';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class MembersService {

  public constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient
  ) {}

  create(createMemberDto: CreateMemberDto) {
    return 'This action adds a new member';
  }

  public async findAll(lang:string) {
    const { data:members } = await this.queryMemberData().eq('info.lang', lang);

    return members;
  }

  public async findOne(id: number, lang:string) {
    const { data:member } = await this.queryMemberData().eq('id', id).eq('info.lang', lang).limit(1).single();

    return member;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }

  private queryMemberData() {
    const query = this.supabase
      .from('members')
      .select('id, github_code, github_user_hash, linkedin_user_hash, info:member_translations!inner(name, last_name, position, skills, summary)')

    return query;
  }
}
