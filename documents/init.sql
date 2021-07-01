/*
 Navicat Premium Data Transfer

 Source Server         : codese-mysql
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : codedidungso.me:4306
 Source Schema         : db

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 29/03/2021 15:04:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_Account
-- ----------------------------
DROP TABLE IF EXISTS `tbl_Account`;
CREATE TABLE `tbl_Account` (
  `accountID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phone` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `role` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'NORMAL',
  `status` varchar(100) DEFAULT 'ACTIVE',
  `is_delete` tinyint DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`accountID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `tbl_Company`;
CREATE TABLE `tbl_Company` (
  `companyID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `companyName` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `website` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phone` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `contactName` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(100) DEFAULT 'ACTIVE',
  `is_delete` tinyint DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`companyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for tbl_Course
-- ----------------------------
DROP TABLE IF EXISTS `tbl_Course`;
CREATE TABLE `tbl_Course` (
  `courseID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `programID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `courseName` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `credit` int DEFAULT NULL,
  `type` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(100) DEFAULT 'ACTIVE',
  `is_delete` tinyint DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`courseID`),
  KEY `programID` (`programID`),
  CONSTRAINT `tbl_Course_ibfk_1` FOREIGN KEY (`programID`) REFERENCES `tbl_Program` (`programID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for tbl_Department
-- ----------------------------
DROP TABLE IF EXISTS `tbl_Department`;
CREATE TABLE `tbl_Department` (
  `departmentID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `departmentName` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(100) DEFAULT 'ACTIVE',
  `is_delete` tinyint DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`departmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- ----------------------------
-- Table structure for tbl_Program
-- ----------------------------
DROP TABLE IF EXISTS `tbl_Program`;
CREATE TABLE `tbl_Program` (
  `programID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `schoolName` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `duration` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `degree` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(100) DEFAULT 'ACTIVE',
  `is_delete` tinyint DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`programID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for tbl_Project
-- ----------------------------
DROP TABLE IF EXISTS `tbl_Project`;
CREATE TABLE `tbl_Project` (
  `projectID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `studentID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `courseID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `topicID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `score` float DEFAULT NULL,
  `status` varchar(100) DEFAULT 'ACTIVE',
  `reportFile` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `teacherComment` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `is_delete` tinyint DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`projectID`),
  KEY `studentID` (`studentID`),
  KEY `topicID` (`topicID`),
  KEY `courseID` (`courseID`),
  CONSTRAINT `tbl_Project_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `tbl_Student` (`studentID`),
  CONSTRAINT `tbl_Project_ibfk_4` FOREIGN KEY (`topicID`) REFERENCES `tbl_Topic` (`topicID`),
  CONSTRAINT `tbl_Request_ibfk_5` FOREIGN KEY (`courseID`) REFERENCES `tbl_Course` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for tbl_Request
-- ----------------------------
DROP TABLE IF EXISTS `tbl_Request`;
CREATE TABLE `tbl_Request` (
  `requestID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `studentID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `note` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `courseID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `topicID1` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `topicID2` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `topicID3` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `timeType` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `SIS_status` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `englishScore` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `creditDebt` int DEFAULT NULL,
  `semester` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(100) DEFAULT 'WAIT1',
  `is_delete` tinyint DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`requestID`),
  KEY `courseID` (`courseID`),
  KEY `topicID1` (`topicID1`),
  KEY `topicID2` (`topicID2`),
  KEY `topicID3` (`topicID3`),
  KEY `studentID` (`studentID`),
  CONSTRAINT `tbl_Request_ibfk_1` FOREIGN KEY (`topicID1`) REFERENCES `tbl_Topic` (`topicID`),
  CONSTRAINT `tbl_Request_ibfk_2` FOREIGN KEY (`topicID2`) REFERENCES `tbl_Topic` (`topicID`),
  CONSTRAINT `tbl_Request_ibfk_3` FOREIGN KEY (`topicID3`) REFERENCES `tbl_Topic` (`topicID`),
  CONSTRAINT `tbl_Request_ibfk_4` FOREIGN KEY (`studentID`) REFERENCES `tbl_Student` (`studentID`),
  CONSTRAINT `tbl_Request_ibfk_51` FOREIGN KEY (`courseID`) REFERENCES `tbl_Course` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for tbl_Student
-- ----------------------------
DROP TABLE IF EXISTS `tbl_Student`;
CREATE TABLE `tbl_Student` (
  `studentID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `accountID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`programID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `studentName` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `studentNumber` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `gender` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'Nam',
  `schoolEmail` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `facebookLink` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `cvLink` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `country` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `province` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(100) DEFAULT 'ACTIVE',
  `is_delete` tinyint DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`studentID`),
  KEY `accountID` (`accountID`),
  KEY `programID` (`programID`),
  CONSTRAINT `tbl_Student_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `tbl_Account` (`accountID`),
  CONSTRAINT `tbl_Student_ibfk_2` FOREIGN KEY (`programID`) REFERENCES `tbl_Program` (`programID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for tbl_Teacher
-- ----------------------------
DROP TABLE IF EXISTS `tbl_Teacher`;
CREATE TABLE `tbl_Teacher` (
  `teacherID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `accountID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `departmentID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `teacherName` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `teacherNumber` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(100) DEFAULT 'ACTIVE',
  `is_delete` tinyint DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`teacherID`),
  KEY `accountID` (`accountID`),
  KEY `departmentID` (`departmentID`),
  CONSTRAINT `tbl_Teacher_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `tbl_Account` (`accountID`),
  CONSTRAINT `tbl_Teacher_ibfk_2` FOREIGN KEY (`departmentID`) REFERENCES `tbl_Department` (`departmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for tbl_Topic
-- ----------------------------
DROP TABLE IF EXISTS `tbl_Topic`;
CREATE TABLE `tbl_Topic` (
  `topicID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `teacherID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `companyID` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `topicName` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `maxStudent` int DEFAULT 10,
  `status` varchar(100) DEFAULT 'ACTIVE',
  `is_delete` tinyint DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`topicID`),
  KEY `teacherID` (`teacherID`),
  KEY `companyID` (`companyID`),
  CONSTRAINT `tbl_Topic_ibfk_1` FOREIGN KEY (`teacherID`) REFERENCES `tbl_Teacher` (`teacherID`),
  CONSTRAINT `tbl_Topic_ibfk_2` FOREIGN KEY (`companyID`) REFERENCES `tbl_Company` (`companyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_account
ON tbl_Account (accountID);

CREATE INDEX idx_company
ON tbl_Company (companyID);

CREATE INDEX idx_course
ON tbl_Course (courseID);

CREATE INDEX idx_department
ON tbl_Program (departmentID);

CREATE INDEX idx_program
ON tbl_Program (programID);

CREATE INDEX idx_project
ON tbl_Project (projectID);

CREATE INDEX idx_request
ON tbl_Request (requestID);

CREATE INDEX idx_student
ON tbl_Student (studentID);

CREATE INDEX idx_teacher
ON tbl_Teacher (teacherID);

CREATE INDEX idx_topic
ON tbl_Topic (topicID);

SET FOREIGN_KEY_CHECKS = 1;
