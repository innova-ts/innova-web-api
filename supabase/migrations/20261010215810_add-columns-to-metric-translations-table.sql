ALTER TABLE metric_translations
ADD COLUMN lang varchar(5) NOT NULL,
ADD COLUMN created_at timestamptz DEFAULT now() NOT NULL,
ADD COLUMN updated_at timestamptz DEFAULT now() NOT NULL;