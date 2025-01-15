

DROP TABLE IF EXISTS "all_user_info" CASCADE;
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



DROP TABLE IF EXISTS "user_account_info" CASCADE;
CREATE TABLE IF NOT EXISTS "user_account_info"(
"id"  SERIAL PRIMARY KEY ,
"id_user" INT,
"user_posts_number" INT NULL,
"user_followers" INT  NULL,
"user_followings" INT NULL,
FOREIGN KEY ("id_user") REFERENCES "all_user_info"("id") ON DELETE CASCADE 
); 
INSERT INTO "user_account_info" ("id_user","user_posts_number","user_followers","user_followings") VALUES
(1, 1, 100, 259  ),
(2, 1, 10, 300 ),
(3, 1, 123, 1000),
(4, 1, 0, 1);



DROP TABLE IF EXISTS "post_info" CASCADE;
CREATE TABLE IF NOT EXISTS "post_info"(
"id" SERIAL PRIMARY KEY,
"id_user" INT,
"user_post"  VARCHAR(500) NOT NULL,
"post_description"  VARCHAR(200) NULL,
"likes" INT NULL,
FOREIGN KEY ("id_user") REFERENCES "all_user_info"("id") ON DELETE CASCADE 
);
INSERT INTO "post_info" ("id_user","user_post", "post_description", "likes") VALUES
(1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLe6lkGg9A6mLuugm_LOa6JuwFmYY3PLpI5A&s', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          accusamus perspiciatis atque mollitia optio nam quas inventore., ',200),
(2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLER9ZHaV1l803TIcTXofkMDmrVQIJH5SgVg&s', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          accusamus perspiciatis atque mollitia optio nam quas inventore',1000),
(3, 'https://as1.ftcdn.net/v2/jpg/05/61/46/34/1000_F_561463476_xWrAXDuuG5GHeRN9rCuXxJe0ZZrPRrOh.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          accusamus perspiciatis atque mollitia optio nam quas inventore',10),
(4, 'https://wh40k-fr.lexicanum.com/mediawiki/images/f/fd/Cover-SpaceMarinesPrimaris-Ultramarines-v8.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          accusamus perspiciatis atque mollitia optio nam quas inventore,',165);

-- *partie ajoutée grace a bolt

/*
  # Add dummy data to tables
  
  1. Changes
    - Add 500 dummy records to all_user_info
    - Add corresponding records to user_account_info with user_posts_number = 1
    - Add corresponding posts to post_info
*/

-- Insert dummy users
INSERT INTO "all_user_info" ("name", "password", "photo")
SELECT 
  'user_' || i || '_' || (
    CASE (i % 5) 
      WHEN 0 THEN 'warrior'
      WHEN 1 THEN 'mage'
      WHEN 2 THEN 'ranger'
      WHEN 3 THEN 'paladin'
      ELSE 'rogue'
    END
  ),
  'pass_' || i,
  'https://i.pravatar.cc' || (FLOOR(RANDOM() * 1000))::TEXT || '/500'
FROM generate_series(5, 500) i;

-- Insert corresponding account info
INSERT INTO "user_account_info" ("id_user", "user_posts_number", "user_followers", "user_followings")
SELECT 
  id,
  1,  -- Always 1 as requested
  floor(random() * 1000)::int,  -- Random followers between 0-999
  floor(random() * 1000)::int   -- Random followings between 0-999
FROM "all_user_info"
WHERE id > 500;  -- Skip the first 4 existing records

-- Insert corresponding posts
INSERT INTO "post_info" ("id_user", "user_post", "post_description", "likes")
SELECT 
  id,
  'https://picsum.photos/id/' || (FLOOR(RANDOM() * 1000))::TEXT || '/500/500',
  CASE (FLOOR(RANDOM() * 5 + 1))::INT
    WHEN 1 THEN 'Just sharing my amazing journey! #lifestyle #adventure'
    WHEN 2 THEN 'Beautiful day to explore something new! #exploration #photography'
    WHEN 3 THEN 'Creating memories that last forever #memories #life'
    WHEN 4 THEN 'Sometimes the best moments are unplanned #spontaneous #fun'
    ELSE 'Living life to the fullest #blessed #grateful'
  END,
  FLOOR(RANDOM() * 1000 + 1)::INT
FROM "all_user_info" au
WHERE au.id > 500;

