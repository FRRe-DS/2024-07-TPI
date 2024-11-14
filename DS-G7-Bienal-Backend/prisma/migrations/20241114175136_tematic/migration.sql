-- AlterTable
CREATE SEQUENCE tematic_id_seq;
ALTER TABLE "Tematic" ALTER COLUMN "id" SET DEFAULT nextval('tematic_id_seq');
ALTER SEQUENCE tematic_id_seq OWNED BY "Tematic"."id";
