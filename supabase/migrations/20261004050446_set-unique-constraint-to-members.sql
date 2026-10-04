ALTER TABLE member_translations
ADD CONSTRAINT member_translations_member_id_lang_unique UNIQUE (member_id, lang);