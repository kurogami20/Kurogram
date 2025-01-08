DROP TABLE IF EXISTS "all_user_info" CASCADE;
DROP TABLE IF EXISTS "user_account_info" CASCADE;
DROP TABLE IF EXISTS "post_info" CASCADE;

CREATE TABLE IF NOT EXISTS "all_user_info"(
"id" SERIAL PRIMARY KEY ,
"name"  VARCHAR(20) NOT NULL,
"password"  VARCHAR(20) NOT NULL,
"photo" VARCHAR(200)   
); 
INSERT INTO "all_user_info" ("name","password","photo") VALUES
('kurogami_20', 'kuro', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLe6lkGg9A6mLuugm_LOa6JuwFmYY3PLpI5A&s'),
('gold_finger', 'goldy', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLER9ZHaV1l803TIcTXofkMDmrVQIJH5SgVg&s' ),
('dino', 'dino', 'https://as1.ftcdn.net/v2/jpg/05/61/46/34/1000_F_561463476_xWrAXDuuG5GHeRN9rCuXxJe0ZZrPRrOh.jpg'),
('primaris_457', 'onlywar', 'https://wh40k-fr.lexicanum.com/mediawiki/images/f/fd/Cover-SpaceMarinesPrimaris-Ultramarines-v8.jpg');




CREATE TABLE IF NOT EXISTS "user_account_info"(
"id"  SERIAL PRIMARY KEY ,
"id_user" INT REFERENCES "all_user_info"("id"),
"user_name" VARCHAR(20),
"user_photo" VARCHAR(200) ,
"user_posts_number" INT NULL,
"user_followers" INT  NULL,
"user_followings" INT NULL
); 
INSERT INTO "user_account_info" ("id_user","user_name","user_posts_number","user_followers","user_followings", "user_photo") VALUES
(1,'kurogami_20', 10, 100, 259,  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLe6lkGg9A6mLuugm_LOa6JuwFmYY3PLpI5A&s'),
(2,'gold_finger', 0, 10, 300,  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLER9ZHaV1l803TIcTXofkMDmrVQIJH5SgVg&s' ),
(3,'dino', 100, 123, 1000,  'https://as1.ftcdn.net/v2/jpg/05/61/46/34/1000_F_561463476_xWrAXDuuG5GHeRN9rCuXxJe0ZZrPRrOh.jpg'),
(4,'primaris_457', 1, 0, 1,  'https://wh40k-fr.lexicanum.com/mediawiki/images/f/fd/Cover-SpaceMarinesPrimaris-Ultramarines-v8.jpg');




CREATE TABLE IF NOT EXISTS "post_info"(
"id" SERIAL PRIMARY KEY,
"id_user" INT REFERENCES "all_user_info"("id"),
"user_name" VARCHAR(20) ,
"user_photo" VARCHAR(200),
"user_post"  VARCHAR(200) NOT NULL,
"post_description"  VARCHAR(200) NULL
);
INSERT INTO "post_info" ("id_user","user_name", "user_photo", "user_post", "post_description") VALUES
(1,'kurogami_20', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLe6lkGg9A6mLuugm_LOa6JuwFmYY3PLpI5A&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLe6lkGg9A6mLuugm_LOa6JuwFmYY3PLpI5A&s', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          accusamus perspiciatis atque mollitia optio nam quas inventore.'),
(2,'gold_finger', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLER9ZHaV1l803TIcTXofkMDmrVQIJH5SgVg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLER9ZHaV1l803TIcTXofkMDmrVQIJH5SgVg&s', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          accusamus perspiciatis atque mollitia optio nam quas inventore,'),
(3,'dino', 'https://as1.ftcdn.net/v2/jpg/05/61/46/34/1000_F_561463476_xWrAXDuuG5GHeRN9rCuXxJe0ZZrPRrOh.jpg', 'https://as1.ftcdn.net/v2/jpg/05/61/46/34/1000_F_561463476_xWrAXDuuG5GHeRN9rCuXxJe0ZZrPRrOh.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          accusamus perspiciatis atque mollitia optio nam quas inventore,'),
(4,'primaris_457', 'https://wh40k-fr.lexicanum.com/mediawiki/images/f/fd/Cover-SpaceMarinesPrimaris-Ultramarines-v8.jpg', 'https://wh40k-fr.lexicanum.com/mediawiki/images/f/fd/Cover-SpaceMarinesPrimaris-Ultramarines-v8.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          accusamus perspiciatis atque mollitia optio nam quas inventore,');
