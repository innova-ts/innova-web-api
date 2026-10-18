CREATE OR REPLACE FUNCTION public.list_happier_companies(p_top int, p_lang varchar(5))
RETURNS TABLE (
    "id" bigint,
    "name" varchar(150),
    "logoSource" VARCHAR(250)
)
LANGUAGE sql
AS $$
    SELECT 
        cp.id, 
        cpt.name,
        cp.logo_source AS logoSource
    FROM comments c
        INNER JOIN employees e ON c.employee_id = e.id
        INNER JOIN companies cp ON e.company_id = cp.id
        INNER JOIN company_translations cpt ON cp.id = cpt.company_id
    WHERE
        c.deleted_at IS NULL
        AND cp.deleted_at IS NULL
        AND cpt.lang = p_lang
        AND c.stars >= 4
    ORDER BY c.stars DESC
    LIMIT p_top;
$$;