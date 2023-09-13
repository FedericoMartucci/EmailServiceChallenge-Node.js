-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `country` VARCHAR(20) NULL,
    `firstname` VARCHAR(20) NULL,
    `lastname` VARCHAR(20) NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Email` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateOfEmail` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fromEmail` VARCHAR(40) NOT NULL,
    `toEmail` VARCHAR(40) NOT NULL,
    `subject` VARCHAR(40) NOT NULL,
    `text` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
