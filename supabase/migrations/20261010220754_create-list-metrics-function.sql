CREATE OR REPLACE FUNCTION public.get_metrics(p_lang varchar(5))
RETURNS TABLE (
    "id" bigint,
    "value" varchar(10),
    "symbol" varchar(1),
    "title" varchar(250),
    "description" varchar(250)
)
LANGUAGE sql
AS $$
    SELECT m.id, m.value, m.symbol, mt.title, mt.description
    FROM metrics m 
    INNER JOIN metric_translations mt ON mt.metric_id = m.id
    WHERE mt.lang = p_lang;
$$;