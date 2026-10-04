export class Member {
    public id: number;
    public github_code: string;
    public github_user_hash: string;
    public linkedin_user_hash: string;
    public info: {
        name: string;
        skills: string;
        summary: string;
        position: string;
        last_name: string;
    }
}
