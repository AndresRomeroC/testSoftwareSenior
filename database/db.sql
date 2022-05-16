-- to create a new database
CREATE DATABASE testPrueba;

-- to use database
use testPrueba;

-- creating a new table
CREATE TABLE `articulo` (
	`id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) NULL DEFAULT NULL,
	`comment` VARCHAR(500) NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB
;
CREATE TABLE `cliente` (
	`id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(50) NULL DEFAULT NULL,
	`last_name` VARCHAR(50) NULL DEFAULT NULL,
	`email` VARCHAR(100) NULL DEFAULT NULL,
	`gender` VARCHAR(50) NULL DEFAULT NULL,
	`company` VARCHAR(250) NULL DEFAULT NULL,
	`city` VARCHAR(100) NULL DEFAULT NULL,
	`title` VARCHAR(250) NULL DEFAULT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `email` (`email`)
)
ENGINE=InnoDB
;


-- to show all tables
show tables;

-- to describe table
describe articulo;


});