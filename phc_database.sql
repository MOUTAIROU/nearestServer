-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Sam 20 Mars 2021 à 14:45
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `phc_database`
--

-- --------------------------------------------------------

--
-- Structure de la table `client_compl_info`
--

CREATE TABLE IF NOT EXISTS `client_compl_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `premon` varchar(255) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `ville` varchar(155) DEFAULT NULL,
  `client_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `client_compl_info`
--

INSERT INTO `client_compl_info` (`id`, `nom`, `premon`, `telephone`, `email`, `ville`, `client_id`) VALUES
(1, 'Bastou', 'MOUTAIROU', '98493853', 'a@yahoo.com', 'cotonou', '2'),
(2, 'Bastou', 'MOUTAIROU', '98493853', 'a@yahoo.com', 'cotonou', '1'),
(3, 'Bastou', 'MOUTAIROU', '98493853', 'a@yahoo.com', 'cotonou', '3');

-- --------------------------------------------------------

--
-- Structure de la table `client_contact`
--

CREATE TABLE IF NOT EXISTS `client_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msg` longtext,
  `nom` varchar(255) DEFAULT NULL,
  `client_id` varchar(11) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `client_contact`
--

INSERT INTO `client_contact` (`id`, `msg`, `nom`, `client_id`, `date`, `email`) VALUES
(1, 'message messagemessagemessagemessagemessagemessage', 'bastou', '1', '2020-10-26', NULL),
(2, 'message', 'non', '4', '2020-11-05', NULL),
(3, 'message ok ', 'MOUTAIROU', '4', '2020-11-14', 'Bastou'),
(4, 'message', 'MOIROU', '4', '2020-11-14', 'Email'),
(5, 'message', 'MOIROU', '4', '2020-11-14', 'Email');

-- --------------------------------------------------------

--
-- Structure de la table `client_users`
--

CREATE TABLE IF NOT EXISTS `client_users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) DEFAULT NULL,
  `client_telephone` varchar(255) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `checkCode` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Contenu de la table `client_users`
--

INSERT INTO `client_users` (`id`, `client_name`, `client_telephone`, `date`, `checkCode`) VALUES
(1, 'Bastou', '746373884', '2020-10-24', NULL),
(2, 'Bastou', '74637388', '2020-10-24', NULL),
(3, 'fahrane', '9846378', '2020-10-25', NULL),
(4, 'moutairou', '96532496', '2020-11-01', NULL),
(5, 'MOUTAIROU', '09532496', '2020-11-01', NULL),
(6, 'MOUTAIROUB', '96532496', '2020-11-02', NULL),
(7, 'MOUTAIROU9', '96532496', '2020-11-02', NULL),
(8, 'MOUTAIROU', '96534296', '2020-11-03', NULL),
(9, '', '', '2020-11-06', NULL),
(10, '98648394', '8474838', '2020-11-14', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `phc_drugs`
--

CREATE TABLE IF NOT EXISTS `phc_drugs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phc_id` int(11) DEFAULT NULL,
  `name` varchar(5000) DEFAULT NULL,
  `molecule` varchar(255) DEFAULT NULL,
  `quantity` varchar(10) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `code` varchar(500) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`(255)),
  KEY `name_2` (`name`(255)),
  KEY `name_3` (`name`(255)),
  KEY `name_4` (`name`(255)),
  FULLTEXT KEY `ind_full_name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=66 ;

--
-- Contenu de la table `phc_drugs`
--

INSERT INTO `phc_drugs` (`id`, `phc_id`, `name`, `molecule`, `quantity`, `price`, `code`, `date`) VALUES
(24, 14, 'FORTALINE 93 g  Sirop', 'AMPICILLINE', 'true', '1500', '79209329914', '2020-10-24'),
(25, 14, 'ACCUZON 250 mg Poudre', 'AMPICILLINE', 'true', '1500', '048375814', '2020-10-24'),
(26, 14, 'AMPICILLINE TM 20 mg Gel', 'AMPICILLINE', 'true', '1000', '74647293', '2020-10-23'),
(27, 14, 'BRUFEN 400 mg Ovule', 'AMPICILLINE', 'true', '1300', '947473838', '2020-10-23'),
(28, 14, 'GYNO - PVARYL  150 mg Ovule', 'AMPICILLINE', 'true', '500', '007472838', '2020-10-23'),
(29, 14, 'FORTALINE 93 g  Sirop', 'AMPICILLINE', 'true', '1500', '792093299', '2020-10-23'),
(30, 14, 'ACCUZON 250 mg Poudre', 'AMPICILLINE', 'true', '1500', '0483758', '2020-10-23'),
(31, 14, 'AMPICILLINE TM 20 mg Gel', 'AMPICILLINE', 'true', '1000', '74647293', '2020-10-23'),
(32, 14, 'BRUFEN 400 mg Ovule', 'AMPICILLINE', 'true', '1300', '947473838', '2020-10-23'),
(33, 14, 'GYNO - PVARYL  150 mg Ovule', 'AMPICILLINE', 'true', '500', '007472838', '2020-10-23'),
(34, 14, 'FORTALINE 93 g  Sirop', 'AMPICILLINE', 'true', '1500', '792093299', '2020-10-23'),
(35, 14, 'ACCUZON 250 mg Poudre', 'AMPICILLINE', 'true', '1500', '0483758', '2020-10-23'),
(36, 14, 'AMPICILLINE TM 20 mg Gel', 'AMPICILLINE', 'true', '1000', '74647293', '2020-10-23'),
(37, 14, 'BRUFEN 400 mg Ovule', 'AMPICILLINE', 'true', '1300', '947473838', '2020-10-23'),
(38, 14, 'GYNO - PVARYL  150 mg Ovule', 'AMPICILLINE', 'true', '500', '007472838', '2020-10-23'),
(39, 14, 'FORTALINE 93 g  Sirop', 'AMPICILLINE', 'true', '1500', '792093299', '2020-10-23'),
(40, 14, 'ACCUZON 250 mg Poudre', 'AMPICILLINE', 'true', '1500', '0483758', '2020-10-23'),
(41, 14, 'AMPICILLINE TM 20 mg Gel', 'AMPICILLINE', 'false', '1000', '74647293', '2020-10-23'),
(42, 14, 'BRUFEN 400 mg Ovule', 'AMPICILLINE', 'true', '1300', '947473838', '2020-10-23'),
(43, 14, 'GYNO - PVARYL  150 mg Ovule', 'AMPICILLINE', 'true', '500', '007472838', '2020-10-23'),
(44, 14, 'FORTALINE 93 g  Sirop', 'AMPICILLINE', 'true', '1500', '792093299', '2020-10-23'),
(45, 14, 'ACCUZON 250 mg Poudre', 'AMPICILLINE', 'true', '1500', '0483758', '2020-10-23'),
(46, 10, 'AMPICILLINE TM 20 mg Gel', 'AMPICILLINE', 'false', '1000', '7464729310', '2020-10-26'),
(47, 10, 'BRUFEN 400 mg Ovule', 'AMPICILLINE', 'fasle', '1300', '94747383810', '2020-10-26'),
(48, 10, 'GYNO - PVARYL  150 mg Ovule', 'AMPICILLINE', 'true', '500', '00747283810', '2020-10-26'),
(49, 10, 'FORTALINE 93 g  Sirop', 'AMPICILLINE', 'true', '1500', '79209329910', '2020-10-26'),
(50, 10, 'ACCUZON 250 mg Poudre', 'AMPICILLINE', 'true', '1500', '048375810', '2020-10-26'),
(51, 9, 'AMPICILLINE TM 20 mg Gel', 'AMPICILLINE', 'false', '1000', '746472939', '2020-10-26'),
(52, 9, 'BRUFEN 400 mg Ovule', 'AMPICILLINE', 'fasle', '1300', '9474738389', '2020-10-26'),
(53, 9, 'GYNO - PVARYL  150 mg Ovule', 'AMPICILLINE', 'true', '500', '0074728389', '2020-10-26'),
(54, 9, 'FORTALINE 93 g  Sirop', 'AMPICILLINE', 'true', '1500', '7920932999', '2020-10-26'),
(55, 9, 'ACCUZON 250 mg Poudre', 'AMPICILLINE', 'true', '1500', '04837589', '2020-10-26'),
(56, 15, 'AMPICILLINE TM 20 mg Gel', 'AMPICILLINE', 'false', '1000', '7464729315', '2020-10-26'),
(57, 15, 'BRUFEN 400 mg Ovule', 'AMPICILLINE', 'fasle', '1300', '94747383815', '2020-10-26'),
(58, 15, 'GYNO - PVARYL  150 mg Ovule', 'AMPICILLINE', 'true', '500', '00747283815', '2020-10-26'),
(59, 15, 'FORTALINE 93 g  Sirop', 'AMPICILLINE', 'true', '1500', '79209329915', '2020-10-26'),
(60, 15, 'ACCUZON 250 mg Poudre', 'AMPICILLINE', 'true', '1500', '048375815', '2020-10-26'),
(61, 16, 'AMPICILLINE TM 20 mg Gel', 'AMPICILLINE', 'false', '1000', '7464729316', '2020-10-26'),
(62, 16, 'BRUFEN 400 mg Ovule', 'AMPICILLINE', 'fasle', '1300', '94747383816', '2020-10-26'),
(63, 16, 'GYNO - PVARYL  150 mg Ovule', 'AMPICILLINE', 'true', '500', '00747283816', '2020-10-26'),
(64, 16, 'FORTALINE 93 g  Sirop', 'AMPICILLINE', 'true', '1500', '79209329916', '2020-10-26'),
(65, 16, 'ACCUZON 250 mg Poudre', 'AMPICILLINE', 'true', '1500', '048375816', '2020-10-26');

-- --------------------------------------------------------

--
-- Structure de la table `phc_employs`
--

CREATE TABLE IF NOT EXISTS `phc_employs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phc_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `phc_employs`
--

INSERT INTO `phc_employs` (`id`, `phc_id`, `name`, `prenom`, `telephone`, `role`, `mail`, `code`) VALUES
(1, 14, 'Akanni', 'Cedrick', '6473047', 'pharmacien', 'azz@yahoo.com', '3547514'),
(2, 14, 'Akanni', 'Cedrick', '6473047', 'pharmacien', 'azz@yahoo.com', '3547514');

-- --------------------------------------------------------

--
-- Structure de la table `phc_gards`
--

CREATE TABLE IF NOT EXISTS `phc_gards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phc_id` int(11) DEFAULT NULL,
  `lun_ouvert` varchar(255) DEFAULT NULL,
  `lun_fermer` varchar(255) DEFAULT NULL,
  `mar_ouvert` varchar(255) DEFAULT NULL,
  `mar_fermer` varchar(255) DEFAULT NULL,
  `mer_ouvert` varchar(255) DEFAULT NULL,
  `mer_fermer` varchar(255) DEFAULT NULL,
  `jeu_ouvert` varchar(255) DEFAULT NULL,
  `jeu_fermer` varchar(255) DEFAULT NULL,
  `ven_ouvert` varchar(255) DEFAULT NULL,
  `ven_fermer` varchar(255) DEFAULT NULL,
  `sam_ouvert` varchar(255) DEFAULT NULL,
  `sam_fermer` varchar(255) DEFAULT NULL,
  `dim_ouvert` varchar(255) DEFAULT NULL,
  `dim_fermer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `phc_gards`
--

INSERT INTO `phc_gards` (`id`, `phc_id`, `lun_ouvert`, `lun_fermer`, `mar_ouvert`, `mar_fermer`, `mer_ouvert`, `mer_fermer`, `jeu_ouvert`, `jeu_fermer`, `ven_ouvert`, `ven_fermer`, `sam_ouvert`, `sam_fermer`, `dim_ouvert`, `dim_fermer`) VALUES
(1, 14, '00:00', '23:59', '00:00', '23:59', '00:00', '23:59', '00:00', '23:59', '00:00', '23:59', '00:00', '23:59', '00:00', '00:00');

-- --------------------------------------------------------

--
-- Structure de la table `phc_insurances`
--

CREATE TABLE IF NOT EXISTS `phc_insurances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phc_id` int(11) DEFAULT NULL,
  `insurance_id` int(11) DEFAULT NULL,
  `assurance` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `phc_insurances`
--

INSERT INTO `phc_insurances` (`id`, `phc_id`, `insurance_id`, `assurance`, `date`) VALUES
(1, 14, 74647293, 'sunu-assurance', '2020-10-24'),
(2, 14, 74647293, 'gab-assurance', '2020-10-24');

-- --------------------------------------------------------

--
-- Structure de la table `phc_profiles`
--

CREATE TABLE IF NOT EXISTS `phc_profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phc_id` int(11) DEFAULT NULL,
  `intituler` varchar(1000) DEFAULT NULL,
  `img_lien` varchar(255) DEFAULT NULL,
  `phone1` varchar(255) DEFAULT NULL,
  `phone2` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `quartier` varchar(255) DEFAULT NULL,
  `rue1` varchar(255) DEFAULT NULL,
  `rue2` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `longtitude` float(10,6) DEFAULT NULL,
  `latitude` float(10,6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Contenu de la table `phc_profiles`
--

INSERT INTO `phc_profiles` (`id`, `phc_id`, `intituler`, `img_lien`, `phone1`, `phone2`, `ville`, `quartier`, `rue1`, `rue2`, `mail`, `longtitude`, `latitude`) VALUES
(9, 14, 'Phc zongo', '14_airplane.png', '96522496', '96532496', 'cotonou', 'zongo', 'von nsia', '', 'a@yahoo.com', 2.513961, 6.376714),
(10, 10, 'Phc topka', '10_children-920131__340.webp', '87366737738', '483993', 'cotonou', 'zongo', 'von nsia', 'nsia', 'a@yahoo.com', 2.332100, 6.419707),
(11, 9, 'Phc Ganvier', '9_children-920131__340.webp', '87366737738', '483993', 'cotonou', 'zongo', 'von nsia', 'nsia', 'a@yahoo.com', 2.348739, 6.367847),
(12, 15, 'Phc Nati', '15_children-920131__340.webp', '87366737738', '483993', 'porto-novo', 'zongo', 'von nsia', 'nsia', 'a@yahoo.com', 2.360412, 6.348739),
(13, 16, 'Phc Cové', '16_children-920131__340.webp', '87366737738', '483993', 'porto-novo', 'zongo', 'von nsia', 'nsia', 'a@yahoo.com', 2.370031, 6.367847);

-- --------------------------------------------------------

--
-- Structure de la table `phc_users`
--

CREATE TABLE IF NOT EXISTS `phc_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phc_names` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Contenu de la table `phc_users`
--

INSERT INTO `phc_users` (`id`, `phc_names`, `password`, `date`) VALUES
(1, 'iskine', '$2b$08$Bc1ko4BLtB11pL8poZHTMeXKqoubX6Fuj2IThJpD.4Bi9zzZ5YcKq', '2020-10-19'),
(2, 'shaid', '$2b$08$dIllioNVt/Jb2mHXh4iNAORKxhph1qLHVgqAGH7bEZjskVUfSFUT6', '2020-10-22'),
(3, 'shaid1', '$2b$08$6p2OvWVQCO1wMrCwnpSkt.hSNT11PycG64e7twUoj3tSDkMz50xU.', '2020-10-22'),
(4, 'shaid2', '$2b$08$EV4//I1xWm0tAKoc/O6Ize5IQz.yxp2G8zJtEDk69A2yr4D.xIcqS', '2020-10-22'),
(5, 'shaid3', '$2b$08$1t525/pcLncXai0bjM95kukN9AisV5SFe58h41Vk.rTwFh4O.PvMO', '2020-10-22'),
(6, 'shaid4', '$2b$08$5WWKRSe5BMqfLa5Rooh7Luy0dMmZaLhKGaC2wc82ygfQvy1wOnJHe', '2020-10-22'),
(7, 'shaid5', '$2b$08$sqvaL/Zl5wTe6G2OQrn3yOuDAaUMZ5clf4vWZHRaGFlM/nDTpagrS', '2020-10-22'),
(8, 'shaid6', '$2b$08$dnVJ.yk3g8jpHwMouoa1o.xbZye6kAtwwol7nO4fqRn6gMI1BABR.', '2020-10-22'),
(9, 'shaid7', '$2b$08$.uGcYo.6Afy38HfZcPKqp.26xKljDrn7k9E6XXAw/CxTADmZ7Kbpm', '2020-10-22'),
(10, 'shaid8', '$2b$08$exPD3RgEajosDLA7CZMVSu5Gk405vKyMr5EiGYodmAMaZQRTdu9wa', '2020-10-22'),
(11, 'shaid9', '$2b$08$AsBh2Iq5Oszm1QIxZA2JEeg5AyjsNkYQtSQpzUFmNJx9G3Q58BlcS', '2020-10-22'),
(12, 'shaid10', '$2b$08$gEqgQXqA51MiEfAfvH6qvulderTaSdj3jwV7ILQAJs/Z77URAk1zy', '2020-10-22'),
(13, 'shaid11', '$2b$08$x.Jvz70WsD0JoaBiFL0Dh.Q8UzeChE0MZLQ35Ya2Ral0iPUwSO97q', '2020-10-22'),
(14, 'skano2', '$2b$08$BKUc6W2PFFDd8IsdkJs.5.jNcNZmSxxYBLJ8oWYX7VDGL2cdJho0q', '2020-10-22'),
(15, 'ganiou', '$2b$08$NYetlindr3S0NLiUXAQvBua85pWWD5lcdYhUmi9e8XW1BxntvTev2', '2020-10-25'),
(16, 'isiak', '$2b$08$6l.wMRO3PVTRwYA9ZaIPQ.uOsRzwBevkAYs8bGPZKb9TPC1x32zYi', '2020-10-25');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
