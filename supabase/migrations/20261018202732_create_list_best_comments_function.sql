CREATE OR REPLACE FUNCTION public.list_best_comments(p_top int, p_lang varchar(5))
RETURNS TABLE (
    "id" bigint,
    "mesage" text,
    "employee_full_name" VARCHAR(200),
    "employee_initials" VARCHAR(2),
    "employee_position" VARCHAR(250),
    "employee_company" VARCHAR(150)
)
LANGUAGE sql
AS $$
    SELECT 
        c.id, 
        ct.message, 
        CONCAT(e.name, ' ', e.last_name) AS employee_full_name, 
        CONCAT(LEFT(e.name, 1), LEFT(e.last_name, 1)) AS employee_initials,
        pot.name AS employee_position,
        cpt.name AS employee_company
    FROM comments c
        INNER JOIN comment_translations ct ON c.id = ct.comment_id
        INNER JOIN employees e ON c.employee_id = e.id
        INNER JOIN companies cp ON e.company_id = cp.id
        INNER JOIN company_translations cpt ON cp.id = cpt.company_id
        INNER JOIN positions po ON e.position_id = po.id
        INNER JOIN position_translations pot ON po.id = pot.position_id
    WHERE
        ct.lang = p_lang
        AND c.deleted_at IS NULL
        AND cp.deleted_at IS NULL
        AND cpt.lang = p_lang
        AND po.deleted_at IS NULL
        AND pot.lang = p_lang
        AND c.stars >= 4
    ORDER BY c.created_at DESC
    LIMIT p_top;
$$;