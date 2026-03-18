/***********************************************************************************************************************
 * Program name :           test_data_insert.sql
 * Description :            Application principale
 * Author :                 Cédric Jankiewicz
 * Creation date :          11.02.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1
 **********************************************************************************************************************/

USE `videogames_platform`;

-- -----------------------------------------------------
-- Genres
-- -----------------------------------------------------
INSERT INTO Genres (name) VALUES
                                  ('Action'),
                                  ('Adventure'),
                                  ('RPG'),
                                  ('Strategy'),
                                  ('Simulation'),
                                  ('Indie');

-- -----------------------------------------------------
-- Publishers
-- -----------------------------------------------------
INSERT INTO Publishers (username, email, password) VALUES
                                                           ('EpicForge', 'contact@epicforge.com', '$2b$10$ysqvT4ggwWNyjPBmKYRoiOOqWm0Jgzqs85IA07US./zKNgEeSVhU2'),   #hashedpass1
                                                           ('PixelWorks', 'support@pixelworks.com', '$2b$10$uJcaq.TG.X4f/YmkhswYa.feiFo1FlzmKSUfUHFcc6i0aijhbYfqW'), #hashedpass2
                                                           ('NovaStudios', 'hello@novastudios.com', '$2b$10$g4yw/9dNh.5Y2H64Y9J2l.17k.UfREA6TocGDvfDwjjhPkpZusJ1.'); #hashedpass3

-- -----------------------------------------------------
-- Users
-- -----------------------------------------------------
INSERT INTO Users (username, email, password) VALUES
                                                      ('playerOne', 'player1@mail.com', '$2b$10$qa2l.nxh.EYXdjDwMIITwe7.GRItI1LhUwTErcj5rxh1qZGUhNAhy'),             #userpass1
                                                      ('gamerGirl', 'gamergirl@mail.com', '$2b$10$GfMQviKBX9yzkAA/JYrtf.NZuo/vLRGr.ChA/Ax71uLML5BbWBBr.'),           #userpass2
                                                      ('noobMaster', 'noob@mail.com', '$2b$10$Sw7WNLawh0g9TC48U.ofAeDlmrIdTzjCrC0e7qJMoDwTP8rII9hAq'),               #userpass3
                                                      ('proSlayer', 'pro@mail.com', '$2b$10$CGVn1VxphfwFIxo6m5IkKukSy/V/ZPHlzXhXKWWSsObDqJ0A2sRzm');                 #userpass4

-- -----------------------------------------------------
-- Games
-- -----------------------------------------------------
INSERT INTO Games (publisher_id, name, description, price) VALUES
                                                               (1, 'Blade of Eternity', 'An epic action RPG in a fantasy world', 49.99),
                                                               (1, 'Steel Arena', 'Fast-paced multiplayer combat game', 29.99),
                                                               (2, 'Mystic Valley', 'Relaxing adventure and exploration', 19.99),
                                                               (3, 'Empire Architect', 'Build and manage your own empire', 39.99);

-- -----------------------------------------------------
-- DLCs
-- -----------------------------------------------------
INSERT INTO DLCs (game_id, name, description, price) VALUES
                                                         (1, 'Shadow Expansion', 'New storyline and dark powers', 14.99),
                                                         (1, 'Golden Weapons Pack', 'Exclusive weapon skins', 4.99),
                                                         (3, 'Mystic Pets', 'Cute companions for your journey', 6.99),
                                                         (4, 'Advanced Buildings', 'Unlock high-level structures', 9.99);

-- -----------------------------------------------------
-- Games_has_Genres
-- -----------------------------------------------------
INSERT INTO Games_has_Genres (game_id, genre_id) VALUES
                                                     (1, 1), -- Action
                                                     (1, 3), -- RPG
                                                     (2, 1), -- Action
                                                     (3, 2), -- Adventure
                                                     (3, 6), -- Indie
                                                     (4, 4); -- Strategy

-- -----------------------------------------------------
-- Users_has_Games
-- -----------------------------------------------------
INSERT INTO Users_has_Games (user_id, game_id) VALUES
                                                   (1, 1),
                                                   (1, 3),
                                                   (2, 1),
                                                   (2, 2),
                                                   (3, 3),
                                                   (4, 1),
                                                   (4, 2),
                                                   (4, 4);

-- -----------------------------------------------------
-- Users_has_DLCs
-- -----------------------------------------------------
INSERT INTO Users_has_DLCs (user_id, DLC_id) VALUES
                                                 (1, 1),
                                                 (1, 2),
                                                 (2, 1),
                                                 (3, 3),
                                                 (4, 4);
