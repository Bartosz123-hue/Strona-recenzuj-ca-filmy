-- Baza danych: filmy_ranking
CREATE DATABASE IF NOT EXISTS filmy_ranking CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE filmy_ranking;

-- Tabela filmów (likes kumulują się bez ograniczeń)
CREATE TABLE IF NOT EXISTS filmy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tytul VARCHAR(255) NOT NULL,
    rok INT NOT NULL,
    opis TEXT NOT NULL,
    img VARCHAR(255) DEFAULT 'img/default.jpg',
    likes INT DEFAULT 0,
    data_dodania DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Przykładowe filmy
INSERT INTO filmy (tytul, rok, opis, img) VALUES
('Forrest Gump', 1994, 'Amerykański film fabularny z 1994 roku w reżyserii Roberta Zemeckisa. Scenariusz został oparty na powieści o tym samym tytule Winstona Grooma. W tytułową rolę wcielił się tu Tom Hanks. Na całym świecie film zarobił ponad 677 milionów dolarów.', 'img/forrest.jpg'),
('Obcy – ósmy pasażer "Nostromo"', 1979, 'Brytyjsko-amerykański horror fantastycznonaukowy w reżyserii Ridleya Scotta z 1979 roku, pierwsza część serii Obcy. Film zapoczątkował pierwszą amerykańską serię, w której główną, heroiczną rolę gra kobieta. W roku 2002 Biblioteka Kongresu USA uznała film za „znaczący kulturowo".', 'img/obcy.jpg'),
('Szklana Pułapka', 1988, 'Szklana pułapka (ang. Die Hard) – amerykański film sensacyjny w reżyserii Johna McTiernana z 1988, pierwsza część serii. Film przedstawia historię nowojorskiego detektywa Johna McClane (Bruce Willis). Uważana za klasyczny film akcji oraz najlepszy film o tematyce bożonarodzeniowej.', 'img/szklana_pulapka.jpg'),
('Władca Pierścieni: Drużyna Pierścienia', 2001, 'Pierwszy film z trylogii Władca Pierścieni w reżyserii Petera Jacksona. Adaptacja powieści J.R.R. Tolkiena. Kręcono go w plenerach Nowej Zelandii równocześnie z dwiema pozostałymi częściami trylogii. Serwis Rotten Tomatoes przyznał mu wynik 91%.', 'img/LOTR.jpg');
