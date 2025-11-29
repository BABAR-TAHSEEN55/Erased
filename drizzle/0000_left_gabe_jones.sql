CREATE TABLE "messages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "messages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"message" varchar NOT NULL,
	"link" varchar NOT NULL,
	CONSTRAINT "messages_link_unique" UNIQUE("link")
);
