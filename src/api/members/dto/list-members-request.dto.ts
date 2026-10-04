import { IsIn, IsNotEmpty } from "class-validator";

export class ListMembersRequestDto {
    @IsNotEmpty()
    @IsIn(['es', 'en'])
    lang: string
}