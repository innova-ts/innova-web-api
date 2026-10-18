-- Set member roles on table
INSERT INTO "public"."member_roles" ("id", "name") VALUES
(1, 'Management'),
(2, 'Developers');


-- Set main members on table
INSERT INTO "public"."members" ("id", "github_code", "github_user_hash", "linkedin_user_hash", "created_at", "member_role_id") VALUES 
(1, '55868033', 'joseloyola200', 'joseloyola200', '2026-10-04 02:02:44.209024+00', 1), 
(2, '183737378', 'victorvelas', 'victor-h-velasquez-008340201', '2026-10-04 02:03:03.207938+00', 1);


INSERT INTO "public"."member_translations" ("id", "member_id", "name", "last_name", "position", "skills", "summary", "created_at", "updated_at", "lang") VALUES 
(1, 1, 'José', 'L.', 'Líder de proyecto', 'Gestión de proyectos,Estratégia,Coordinación de equipos,Gestión de clientes', 'Lidera los proyectos, coordina equipos y clientes, y supervisa la planificación, ejecución y cumplimiento de objetivos.', '2026-10-04 02:05:38.796376+00', '2026-10-04 02:05:38.796376+00', 'es'), 
(2, 1, 'José', 'L.', 'Project Leader', 'Project management,Strategy,Team coordination,Client management', 'Leads projects, coordinates teams and clients, and supervises the planning, execution, and achievement of objectives.', '2026-10-04 02:06:38.044099+00', '2026-10-04 02:06:38.044099+00', 'en'), 
(3, 2, 'Victor', 'V.', 'Líder de equipo', 'Liderazgo técnico,Arquitectura de software,Desarrollo,Metodologías ágiles', 'Lidera al equipo técnico, supervisa el desarrollo y asegura la calidad, eficiencia y cumplimiento de los estándares tecnológicos.', '2026-10-04 02:07:33.528689+00', '2026-10-04 02:07:33.528689+00', 'es'), 
(4, 2, 'Victor', 'V.', 'Team Leader', 'Technical leadership,Software architecture,Development,Agile methodologies', 'Leads the technical team, supervises development, and ensures quality, efficiency, and compliance with technological standards.', '2026-10-04 02:08:16.762388+00', '2026-10-04 02:08:16.762388+00', 'en');


-- Set metrics data
INSERT INTO "public"."metrics" ("id", "value", "symbol") VALUES 
(1, '50', '+'),
(2, '10', '+'),
(3, '99.9', '%'),
(4, '24/7', null);

INSERT INTO "public"."metric_translations" ("metric_id", "title", "description", "lang") VALUES 
(1, 'Proyectos exitosos', 'Despliegues completados', 'es'),
(1, 'Success projects', 'Deployments completed', 'en'),
(2, 'Paises alcanzados', 'Presencia internacional', 'es'),
(2, 'Scoped countries', 'International presence', 'en'),
(3, 'Disponibilidad garantizada', 'Alta disponibilidad SLA', 'es'),
(3, 'Guaranteed uptime', 'High availability SLA', 'en'),
(4, 'Soporte continuo', 'Operatividad ininterrumpida', 'es'),
(4, 'Continuous support', 'Uninterrupted operations', 'en');


-- Companies definition, pending add logo images
INSERT INTO "public"."companies" ("id", "logo_source") VALUES 
(1, ''),
(2, ''),
(3, ''),
(4, '');

INSERT INTO "public"."company_translations" ("company_id", "lang", "name", "description") VALUES 
(1, 'es', 'Fintech Solutions', ''),
(1, 'en', 'Fintech Solutions', ''),
(2, 'es', 'Datacorp', ''),
(2, 'en', 'Datacorp', ''),
(3, 'es', 'ACME', ''),
(3, 'en', 'ACME', ''),
(4, 'es', 'Adirondack S.A.', ''),
(4, 'en', 'Adirondack S.A.', '');


INSERT INTO "public"."positions" ("id", "deleted_at") VALUES 
(1, NULL),
(2, NULL),
(3, NULL);

INSERT INTO "public"."position_translations" ("position_id", "lang", "name") VALUES 
(1, 'es', 'CTO'),
(1, 'en', 'CTO'),
(2, 'es', 'Vicepresidente de ingeniería'),
(2, 'en', 'VP Engineering'),
(3, 'es', 'Líder técnico'),
(3, 'en', 'Tech. Lead');


INSERT INTO "public"."employees" ("id", "company_id", "position_id", "name", "last_name") VALUES 
(1, 1, 1, 'Susana', 'Horia'),
(2, 2, 2, 'Luigi', 'Mada'),
(3, 3, 3, 'Salvador', 'Vulcano'),
(4, 4, 1, 'Elena', 'Nito Del Bosque');

INSERT INTO "public"."comments" ("employee_id", "stars") VALUES 
(1, 5),
(2, 5),
(3, 5),
(4, 5);

INSERT INTO "public"."comment_translations" ("comment_id", "lang", "message") VALUES 
(1, 'es', 'Innova reconstruyo nuestro backend heredado en 4 meses. La latencia se redujo en un 40% y la infraestructura es finalmente predecible.'),
(1, 'en', 'Innova rebuild our legacy backend in 4 months. The latency was reduced by 40% and the infrastructure is finally predictable.'),
(2, 'es', 'El rigor técnico de su equipo es incomparable. No solo escriben código, diseñan arquitecturas pensadas para durar.'),
(2, 'en', 'The technical rigor of their team is incomparable. They don’t just write code, they design architectures meant to last.'),
(3, 'es', 'Excelente servicio, gran dominio técnico y entregas a tiempo. Un socio tecnológico de total confianza.'),
(3, 'en', 'Excellent service, great technical expertise, and on-time delivery. A truly reliable tech partner.'),
(4, 'es', 'Excelente servicio, atención y resultados. El equipo entendió nuestras necesidades y entregó una solución eficiente, profesional y de alta calidad. ¡Totalmente recomendable!'),
(4, 'en', 'Excellent service, great communication, and outstanding results. The team understood our needs and delivered an efficient, professional, high-quality solution. Highly recommended!.');
