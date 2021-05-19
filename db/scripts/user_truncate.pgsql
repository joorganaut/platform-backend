UPDATE "users" SET "is_onboarded" = FALSE where "username" LIKE('%sazee%');



SELECT * FROM "users";

DELETE FROM "profiles" WHERE "user_id" IN (SELECT "id" FROM "users" WHERE "username" LIKE('%sazee%'));
DELETE FROM "partner_users" WHERE "user_id" IN (SELECT "id" FROM "users" WHERE "username" LIKE('%sazee%')) AND "partner_id" IN (SELECT "id" FROM "partners");

DELETE FROM "users" WHERE "username" LIKE('%sazee%');
DELETE FROM "partners" WHERE "id" NOT IN (SELECT "partner_id" FROM "partner_users")

--UPDATE "users" SET "image" = 'https://media-exp1.licdn.com/dms/image/C4E03AQGx5zUPsy0amw/profile-displayphoto-shrink_100_100/0/1610331225220?e=1626307200&v=beta&t=OsjGQqVvXKqr1DRq-qnCG97vA37-Oek3B8Nqvl68GeI'



-- DELETE FROM "knex_migrations"
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;