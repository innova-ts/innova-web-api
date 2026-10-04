CREATE OR REPLACE FUNCTION public.get_member(p_id bigint, p_lang varchar(5))
RETURNS TABLE (
    "id" bigint,
    "github_code" varchar(250),
    "github_user_hash" varchar(250),
    "linkedin_user_hash" varchar(250),
    "name" varchar(250),
    "last_name" varchar(250),
    "position" varchar(250),
    "skills" varchar(250),
    "summary" text
)
LANGUAGE sql
AS $$
    SELECT
        m.id,
        m.github_code,
        m.github_user_hash,
        m.linkedin_user_hash,
        mt.name,
        mt.last_name,
        mt.position,
        mt.skills,
        mt.summary
    FROM members m
    INNER JOIN member_translations mt
        ON m.id = mt.member_id
    WHERE m.id = p_id AND mt.lang = p_lang;
$$;