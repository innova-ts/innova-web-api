import { Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';
import { SUPABASE_CLIENT } from '../../supabase/supabase.module.js';
import { SupabaseClient } from '@supabase/supabase-js';
import { Member } from './entities/member.entity.js';

@Injectable()
export class MembersService {

  public constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient
  ) {}

  create(createMemberDto: CreateMemberDto) {
    return 'This action adds a new member';
  }

  public async findAll(lang:string): Promise<Member[]> {
    const { data:members } = await this.supabase.rpc('find_all_members', {
      p_lang: lang
    });

    return members as Member[];
  }

  public async findOne(id: number, lang:string): Promise<Member> {
    const { data:member } = await this.supabase.rpc('get_member', {
      p_id: id,
      p_lang: lang
    });
    
    return member as unknown as Member;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
