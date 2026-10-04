export class CreateMemberDto {
    github_code:string;
    github_user_hash:string;
    linkedin_user_hash:string;

    
    name: string;
    last_name: string;
    skills: string[];
    summary: string;
    position: string;
}
