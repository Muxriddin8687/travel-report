-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 20 2023 г., 01:02
-- Версия сервера: 10.4.27-MariaDB
-- Версия PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `travel_report`
--

-- --------------------------------------------------------

--
-- Структура таблицы `action`
--

CREATE TABLE `action` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `travel_type_id` int(11) NOT NULL,
  `person_count` int(11) NOT NULL,
  `summ` int(11) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0->active, 1->done, 2-archive',
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `action`
--

INSERT INTO `action` (`id`, `name`, `phone`, `address`, `travel_type_id`, `person_count`, `summ`, `duration`, `user_id`, `status`, `date`) VALUES
(1, 'Admin', '+998998090809', 'qwertyuiop', 1, 4, 300000, '3 hafta', 1, 0, '2023-05-19 04:20:47'),
(2, 'Ali', '+998998090809', 'qwertyuiop', 2, 1, 10000, '3 kun', 1, 0, '2023-05-20 04:20:47'),
(3, 'qwert', '1234567890', 'qwertyuioplkjhg', 2, 3, NULL, '4 kun', 1, 1, '2023-05-19 10:57:31'),
(5, 'Vali Aliev', '+990909009090', 'Urganch tuman', 1, 4, 2700000, '1 hafta (25.05.2023-1.06.2023)', 1, 0, '2023-05-20 03:58:55');

-- --------------------------------------------------------

--
-- Структура таблицы `action_item`
--

CREATE TABLE `action_item` (
  `id` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `price` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `action_item`
--

INSERT INTO `action_item` (`id`, `action_id`, `service_id`, `comment`, `price`, `user_id`) VALUES
(1, 1, 3, 'Dubai-Urganch', 200000, 1),
(2, 1, 4, '4 yulduzli shahar chetidan', 100000, 1),
(3, 2, 3, 'Germany-Urganch', 0, 1),
(10, 2, 5, 'qweweqweqw', 10000, 1),
(11, 5, 3, 'Toshkent-Urganch', 1200000, 1),
(12, 5, 4, '3 yulduzli shahardan', 1500000, 1);

--
-- Триггеры `action_item`
--
DELIMITER $$
CREATE TRIGGER `trigger_action_item_insert` AFTER INSERT ON `action_item` FOR EACH ROW BEGIN

UPDATE `action` AS a SET `summ`=(SELECT SUM(i.price) FROM `action_item` AS i WHERE a.id=i.action_id) WHERE 1;

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trigger_action_item_update` AFTER UPDATE ON `action_item` FOR EACH ROW BEGIN

UPDATE `action` AS a SET `summ`=(SELECT SUM(i.price) FROM `action_item` AS i WHERE a.id=i.action_id) WHERE 1;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `service`
--

INSERT INTO `service` (`id`, `name`, `user_id`) VALUES
(3, 'Borish-Kellish', 1),
(4, 'Mehmonxona', 1),
(5, 'Ekskursiya', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `travel_type`
--

CREATE TABLE `travel_type` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `travel_type`
--

INSERT INTO `travel_type` (`id`, `name`) VALUES
(1, 'Ichki turizm'),
(2, 'Tashqi turizm'),
(3, 'Turistik');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `login` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `login`, `password`, `name`, `phone`, `address`, `date`) VALUES
(1, 'admin', '123', 'savdogar', '+998998090809', 'qwerty', '2023-05-19 04:10:24'),
(2, 'admin', '1234', 'amudaryo', '+998930939200', 'Boltayeva 41, KHiva, KHorezm, Uzbekistan', '2023-05-19 09:42:52');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `action`
--
ALTER TABLE `action`
  ADD PRIMARY KEY (`id`),
  ADD KEY `travel_type_id` (`travel_type_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `action_item`
--
ALTER TABLE `action_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `action_id` (`action_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `travel_type`
--
ALTER TABLE `travel_type`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `action`
--
ALTER TABLE `action`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `action_item`
--
ALTER TABLE `action_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `travel_type`
--
ALTER TABLE `travel_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `action`
--
ALTER TABLE `action`
  ADD CONSTRAINT `action_ibfk_1` FOREIGN KEY (`travel_type_id`) REFERENCES `travel_type` (`id`),
  ADD CONSTRAINT `action_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `action_item`
--
ALTER TABLE `action_item`
  ADD CONSTRAINT `action_item_ibfk_1` FOREIGN KEY (`action_id`) REFERENCES `action` (`id`),
  ADD CONSTRAINT `action_item_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  ADD CONSTRAINT `action_item_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
