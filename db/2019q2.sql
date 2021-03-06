-- MySQL Script generated by MySQL Workbench
-- Mon Jan 25 08:32:12 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema value
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema value
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `value` DEFAULT CHARACTER SET utf8 ;
USE `value` ;

-- -----------------------------------------------------
-- Table `value`.`2019q2_nums`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `value`.`2019q2_nums` ;

CREATE TABLE IF NOT EXISTS `value`.`2019q2_nums` (
  `adsh` VARCHAR(20) NOT NULL,
  `tag` VARCHAR(256) NOT NULL,
  `version` VARCHAR(20) NOT NULL,
  `coreg` VARCHAR(255) NULL,
  `ddate` DATE NOT NULL,
  `qtrs` INT NOT NULL,
  `uom` VARCHAR(20) NOT NULL,
  `value` DECIMAL(30,4) NULL,
  `footnote` VARCHAR(512) NULL,
  UNIQUE INDEX `CompositUnique` (`adsh` ASC, `tag` ASC, `version` ASC, `coreg` ASC, `ddate` ASC, `qtrs` ASC, `uom` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `value`.`2019q2_subs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `value`.`2019q2_subs` ;

CREATE TABLE IF NOT EXISTS `value`.`2019q2_subs` (
  `adsh` VARCHAR(20) NOT NULL,
  `cik` INT(10) NULL,
  `name` VARCHAR(150) NULL,
  `sic` INT(10) NULL,
  `countryba` VARCHAR(2) NULL,
  `stprba` VARCHAR(2) NULL,
  `cityba` VARCHAR(30) NULL,
  `zipba` VARCHAR(10) NULL,
  `bas1` VARCHAR(40) NULL,
  `bas2` VARCHAR(40) NULL,
  `baph` VARCHAR(20) NULL,
  `countryma` VARCHAR(2) NULL,
  `stprma` VARCHAR(2) NULL,
  `cityma` VARCHAR(30) NULL,
  `zipma` VARCHAR(10) NULL,
  `mas1` VARCHAR(40) NULL,
  `mas2` VARCHAR(40) NULL,
  `countryinc` VARCHAR(3) NULL,
  `stprinc` VARCHAR(2) NULL,
  `ein` INT(10) NULL,
  `former` VARCHAR(150) NULL,
  `changed` VARCHAR(8) NULL,
  `afs` VARCHAR(5) NULL,
  `wksi` TINYINT(1) NULL,
  `fye` VARCHAR(4) NULL,
  `form` VARCHAR(10) NULL,
  `period` DATE NULL,
  `fy` YEAR NULL,
  `fp` VARCHAR(2) NULL,
  `filed` DATE NULL,
  `accepted` DATETIME NULL,
  `prevrpt` TINYINT(1) NULL,
  `detail` TINYINT(1) NULL,
  `instance` VARCHAR(32) NULL,
  `nciks` INT(4) NULL,
  `aciks` VARCHAR(120) NULL,
  PRIMARY KEY (`adsh`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `value`.`2019q2_tags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `value`.`2019q2_tags` ;

CREATE TABLE IF NOT EXISTS `value`.`2019q2_tags` (
  `tag` VARCHAR(256) NOT NULL,
  `version` VARCHAR(20) NULL,
  `custom` TINYINT(1) NULL,
  `abstract` TINYINT(1) NULL,
  `datatype` VARCHAR(20) NULL,
  `iord` VARCHAR(1) NULL,
  `crdr` VARCHAR(1) NULL,
  `tlabel` VARCHAR(512) NULL,
  `doc` TEXT(4096) NULL,
  INDEX `Tag` (`tag` ASC),
  INDEX `Version` (`version` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `value`.`2019q2_pres`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `value`.`2019q2_pres` ;

CREATE TABLE IF NOT EXISTS `value`.`2019q2_pres` (
  `adsh` VARCHAR(20) NOT NULL,
  `report` INT(6) NULL,
  `line` INT(6) NULL,
  `stmt` VARCHAR(2) NULL,
  `inpth` TINYINT(1) NULL,
  `rfile` VARCHAR(1) NULL,
  `tag` VARCHAR(256) NULL,
  `version` VARCHAR(20) NULL,
  `plabel` VARCHAR(512) NULL,
  `negating` VARCHAR(256) NULL,
  UNIQUE INDEX `CompositUnique` (`adsh` ASC, `report` ASC, `line` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
