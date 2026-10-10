-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 23, 2026 at 10:16 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `filmy_ranking`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `filmy`
--

CREATE TABLE `filmy` (
  `id` int(11) NOT NULL,
  `tytul` varchar(255) NOT NULL,
  `rok` int(11) NOT NULL,
  `opis` text NOT NULL,
  `img` varchar(255) DEFAULT 'img/default.jpg',
  `likes` int(11) DEFAULT 0,
  `data_dodania` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `filmy`
--

INSERT INTO `filmy` (`id`, `tytul`, `rok`, `opis`, `img`, `likes`, `data_dodania`) VALUES
(1, 'Forrest Gump', 1994, 'Amerykański film fabularny z 1994 roku w reżyserii Roberta Zemeckisa. Scenariusz został oparty na powieści o tym samym tytule Winstona Grooma. W tytułową rolę wcielił się tu Tom Hanks. Na całym świecie film zarobił ponad 677 milionów dolarów.', 'img/forrest.jpg', 8, '2026-04-25 12:26:41'),
(2, 'Obcy – ósmy pasażer \"Nostromo\"', 1979, 'Brytyjsko-amerykański horror fantastycznonaukowy w reżyserii Ridleya Scotta z 1979 roku, pierwsza część serii Obcy. Film zapoczątkował pierwszą amerykańską serię, w której główną, heroiczną rolę gra kobieta. W roku 2002 Biblioteka Kongresu USA uznała film za „znaczący kulturowo\".', 'img/obcy.jpg', 9, '2026-04-25 12:26:41'),
(3, 'Szklana Pułapka', 1988, 'Szklana pułapka (ang. Die Hard) – amerykański film sensacyjny w reżyserii Johna McTiernana z 1988, pierwsza część serii. Film przedstawia historię nowojorskiego detektywa Johna McClane (Bruce Willis). Uważana za klasyczny film akcji oraz najlepszy film o tematyce bożonarodzeniowej.', 'img/szklana_pulapka.jpg', 5, '2026-04-25 12:26:41'),
(4, 'Władca Pierścieni: Drużyna Pierścienia', 2001, 'Pierwszy film z trylogii Władca Pierścieni w reżyserii Petera Jacksona. Adaptacja powieści J.R.R. Tolkiena. Kręcono go w plenerach Nowej Zelandii równocześnie z dwiema pozostałymi częściami trylogii. Serwis Rotten Tomatoes przyznał mu wynik 91%.', 'img/LOTR.jpg', 7, '2026-04-25 12:26:41'),
(5, 'Poszukiwacze zaginionej Arki', 1981, 'Sztandarowe dzieło Kina Nowej Przygody i najbardziej dochodowy film 1981 roku. Łącznie zarobił 384 miliony dolarów wobec 20 mln kosztów produkcji. Przy uwzględnieniu inflacji jest to obecnie 21. najbardziej dochodowy film w historii kina. Jeden z najpopularniejszych filmów zagranicznych okresu PRL; w kinach obejrzało go blisko 9 mln widzów. W postać Indiany Jonesa, archeologa i poszukiwacza przygód, wcielił się Harrison Ford, który, walcząc z nazistami, próbuje odnaleźć Arkę Przymierza.', 'img/film_69ec9aae6e396.jfif', 13, '2026-04-25 12:42:54');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `filmy`
--
ALTER TABLE `filmy`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `filmy`
--
ALTER TABLE `filmy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
