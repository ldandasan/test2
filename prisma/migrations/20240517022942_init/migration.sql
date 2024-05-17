-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30),
    "email" VARCHAR(30),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
