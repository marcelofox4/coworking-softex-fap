-- Versão 2: 04.dez.2024
-- Editado e Revisado: Ismael J., Marcelo R., Walter A.

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema coworking
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `coworking`;
USE coworking;

-- -----------------------------------------------------
-- Table `Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Usuario` (
  `Id_Usuario` INT AUTO_INCREMENT,
  `Nome_Usuario` VARCHAR(100) NOT NULL,
  `Funcao_Usuario` VARCHAR(50) NOT NULL,
  `Email_Usuario` VARCHAR(100) NOT NULL,
  `Login_Usuario` VARCHAR(50) NOT NULL,
  `Senha_Usuario` VARCHAR(50) NOT NULL,
  `Status_Usuario` INT NOT NULL,
  `Created_at_Usuario` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at_Usuario` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Usuario`)
);

-- -----------------------------------------------------
-- Table `Endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Endereco` (
  `Id_Endereco` INT AUTO_INCREMENT,
  `Logradouro` VARCHAR(100) NOT NULL,
  `Numero` INT NOT NULL,
  `Bairro` VARCHAR(100) NOT NULL,
  `UF` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`Id_Endereco`)
);

-- -----------------------------------------------------
-- Table `Admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Admin` (
  `Id_Admin` INT AUTO_INCREMENT,
  `Id_Usuario` INT NOT NULL,
  PRIMARY KEY (`Id_Admin`),
  CONSTRAINT `FK_Admin`
    FOREIGN KEY (`Id_Usuario`)
    REFERENCES `Usuario` (`Id_Usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table `EnderecoFiscal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EnderecoFiscal` (
  `Num_End_Fiscal` INT NOT NULL,
  `Status_End_Fiscal` INT NOT NULL,
  `Updated_at_End_Fiscal` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Created_at_End_Fiscal` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Num_End_Fiscal`)
);

-- -----------------------------------------------------
-- Table `PessoaFisica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PessoaFisica` (
  `Id_Pfisica` INT AUTO_INCREMENT,
  `Cpf` VARCHAR(11) NOT NULL,
  `Id_Cliente` INT NOT NULL,
  PRIMARY KEY (`Id_Pfisica`),
  INDEX (`Id_Cliente`)
);

-- -----------------------------------------------------
-- Table `PessoaJuridica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PessoaJuridica` (
  `Id_PJuridica` INT AUTO_INCREMENT,
  `Cnpj` VARCHAR(14) NOT NULL,
  `Razao_social` VARCHAR(200) NOT NULL,
  `Cliente_Id_Cliente` INT NOT NULL,
  PRIMARY KEY (`Id_PJuridica`),
  INDEX `fk_PessoaJuridica_Cliente_idx` (`Cliente_Id_Cliente`)
);

-- -----------------------------------------------------
-- Table `Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cliente` (
  `Id_Cliente` INT AUTO_INCREMENT,
  `Nome_Cliente` VARCHAR(100) NOT NULL,
  `Telefone_Cliente` VARCHAR(11) NOT NULL,
  `Email_Cliente` VARCHAR(100) NOT NULL,
  `Qtd_pontos_Cliente` INT NOT NULL,
  `Prazo_Cliente` DATE NOT NULL,
  `Valor_mensal_Cliente` DECIMAL NOT NULL,
  `Status_Cliente` INT NOT NULL,
  `Created_at_Cliente` DATETIME NOT NULL,
  `Updated_at_Cliente` DATETIME NOT NULL,
  `Endereco_Id_Endereco` INT NOT NULL,
  `Admin_Id_Admin` INT NOT NULL,
  `EnderecoFiscal_Num_End_Fiscal` INT NOT NULL,
  PRIMARY KEY (`Id_Cliente`, `Endereco_Id_Endereco`, `EnderecoFiscal_Num_End_Fiscal`),
  INDEX `fk_Cliente_Endereco_idx` (`Endereco_Id_Endereco`),
  INDEX `fk_Cliente_Admin_idx` (`Admin_Id_Admin`),
  INDEX `fk_Cliente_EnderecoFiscal_idx` (`EnderecoFiscal_Num_End_Fiscal`)
  -- FOREIGN KEY removed
);

-- Triggers para a tabela Cliente
DELIMITER //
CREATE TRIGGER before_insert_Cliente
BEFORE INSERT ON Cliente
FOR EACH ROW
BEGIN
    SET NEW.Created_at_Cliente = NOW();
    SET NEW.Updated_at_Cliente = NOW();
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER before_update_Cliente
BEFORE UPDATE ON Cliente
FOR EACH ROW
BEGIN
    SET NEW.Updated_at_Cliente = NOW();
END;
//
DELIMITER ;

-- -----------------------------------------------------
-- Table `Encomenda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Encomenda` (
  `Id_Encomenda` INT AUTO_INCREMENT,
  `Obs_Encomenda` VARCHAR(100) NOT NULL,
  `Cliente_EnderecoFiscal_Num_End_Fiscal` INT NOT NULL,
  PRIMARY KEY (`Id_Encomenda`),
  INDEX `fk_Encomenda_Cliente_idx` (`Cliente_EnderecoFiscal_Num_End_Fiscal`)
  -- FOREIGN KEY removed
);

DELIMITER //

CREATE TRIGGER before_insert_Encomenda
BEFORE INSERT ON Encomenda
FOR EACH ROW
BEGIN
    SET NEW.Obs_Encomenda = CONCAT('Encomenda em ', NOW());
END;

//

DELIMITER ;


 -- -----------------------------------------------------
-- Table `RecebimentoEncomenda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RecebimentoEncomenda` (
  `Id_Receb_Encomenda` INT AUTO_INCREMENT,
  `DataHora_Receb_Encomenda` DATETIME NOT NULL,
  `Obs_Receb_encomenda` VARCHAR(200) NOT NULL,
  `Encomenda_Id_Encomenda` INT NOT NULL,
  `EnderecoFiscal_Num_End_Fiscal` INT NOT NULL,
  `Recepcao_Id_Recepcao` INT NOT NULL,
  PRIMARY KEY (`Id_Receb_Encomenda`, `Encomenda_Id_Encomenda`, `EnderecoFiscal_Num_End_Fiscal`),
  INDEX `fk_RecebimentoEncomenda_Encomenda_idx` (`Encomenda_Id_Encomenda`),
  INDEX `fk_RecebimentoEncomenda_EnderecoFiscal_idx` (`EnderecoFiscal_Num_End_Fiscal`),
  INDEX `fk_RecebimentoEncomenda_Recepcao_idx` (`Recepcao_Id_Recepcao`)
  -- FOREIGN KEY removed
);

DELIMITER //
CREATE TRIGGER before_insert_RecebimentoEncomenda
BEFORE INSERT ON RecebimentoEncomenda
FOR EACH ROW
BEGIN
     SET NEW.DataHora_Receb_Encomenda = NOW();
 END;
 //
 DELIMITER ;

-- -----------------------------------------------------
-- Table `Recepcao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Recepcao` (
  `Id_Recepcao` INT AUTO_INCREMENT,
  `Id_Usuario` INT NOT NULL,
  PRIMARY KEY (`Id_Recepcao`)
);

-- -----------------------------------------------------
-- Table `RetiradaEncomenda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RetiradaEncomenda` (
  `Id_Retir_Encomenda` INT AUTO_INCREMENT,
  `DataHora_Retir_encomenda` DATETIME NOT NULL,
  `Obs_Retir_encomenda` VARCHAR(200) NOT NULL,
  `Encomenda_Id_Encomenda` INT NOT NULL,
  `Representante_Id_Represent` INT NOT NULL,
  PRIMARY KEY (`Id_Retir_Encomenda`),
  INDEX `fk_RetiradaEncomenda_Encomenda_idx` (`Encomenda_Id_Encomenda`),
  INDEX `fk_RetiradaEncomenda_Representante_idx` (`Representante_Id_Represent`)
  -- FOREIGN KEY removed
);

 DELIMITER //
 CREATE TRIGGER before_insert_RetiradaEncomenda
 BEFORE INSERT ON RetiradaEncomenda
 FOR EACH ROW
 BEGIN
     SET NEW.DataHora_Retir_encomenda = NOW();
 END;
 //
 DELIMITER ;

-- -----------------------------------------------------
-- Table `Representante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Representante` (
  `Id_Represent` INT AUTO_INCREMENT,
  `Nome_Represent` VARCHAR(100) NOT NULL,
  `Email_Represent` VARCHAR(100) NOT NULL,
  `Status_Represent` INT NOT NULL,
  `Telefone_Represent` VARCHAR(11) NOT NULL,
  `Updated_at_Represent` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Created_at_Represent` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Id_PJuridica` INT NOT NULL,
  PRIMARY KEY (`Id_Represent`)
  -- FOREIGN KEY removed;
);

-- ---------------------------------------------------------------------------------------------------

-- Inserir dados na tabela Usuario
INSERT INTO Usuario (Nome_Usuario, Funcao_Usuario, Email_Usuario, Login_Usuario, Senha_Usuario, Status_Usuario, Created_at_Usuario, Updated_at_Usuario)
VALUES
('Rick kilen', 'Manager', 'admin@email.com', 'Ruy_Barban', 'admin', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('John Doe', 'Developer', 'john.doe@email.com', 'john_doe', 'password123', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Jane Smith', 'Manager', 'jane.smith@email.com', 'jane_smith', 'password456', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bob Johnson', 'Designer', 'bob.johnson@email.com', 'bob_johnson', 'password789', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Alice Williams', 'Analyst', 'alice.williams@email.com', 'alice_williams', 'passwordabc', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Charlie Brown', 'Engineer', 'charlie.brown@email.com', 'charlie_brown', 'passworddef', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Inserir dados na tabela Admin
INSERT INTO Admin (Id_Usuario)
VALUES
(1),
(2);

-- Inserir dados na tabela EnderecoFiscal
INSERT INTO EnderecoFiscal (Num_End_Fiscal, Status_End_Fiscal, Updated_at_End_Fiscal, Created_at_End_Fiscal)
VALUES
(31, 1, NOW(), NOW()),
(32, 0, NOW(), NOW()),
(33, 1, NOW(), NOW()),
(34, 0, NOW(), NOW()),
(35, 1, NOW(), NOW()),
(36, 0, NOW(), NOW()),
(37, 1, NOW(), NOW()),
(38, 0, NOW(), NOW()),
(39, 1, NOW(), NOW()),
(40, 0, NOW(), NOW());

-- Inserir dados na tabela Endereco
INSERT INTO Endereco (Logradouro, Numero, Bairro, UF)
VALUES
('Rua A', 123, 'Centro', 'SP'),
('Avenida B', 456, 'Bairro X', 'RJ'),
('Rua C', 789, 'Bairro Y', 'MG'),
('Avenida D', 101, 'Centro', 'SP'),
('Rua E', 202, 'Bairro Z', 'RJ'),
('Avenida F', 303, 'Bairro X', 'MG'),
('Rua G', 404, 'Centro', 'SP'),
('Avenida H', 505, 'Bairro Y', 'RJ'),
('Rua I', 606, 'Bairro Z', 'MG'),
('Avenida J', 707, 'Centro', 'SP');

-- Inserir dados na tabela Cliente
INSERT INTO Cliente (Nome_Cliente, Telefone_Cliente, Email_Cliente, Qtd_pontos_Cliente, Prazo_Cliente, Valor_mensal_Cliente, Status_Cliente, Created_at_Cliente, Updated_at_Cliente, Endereco_Id_Endereco, Admin_Id_Admin, EnderecoFiscal_Num_End_Fiscal)
VALUES
('João Silva', '1111-2222', 'joao.silva@email.com', 2, '2023-12-31', 400.00, 0, NOW(), NOW(), 1, 1, 32),
('Maria Oliveira', '3333-4444', 'maria.oliveira@email.com', 3, '2023-12-31', 600.00, 1, NOW(), NOW(), 2, 2, 31),
('Carlos Santos', '5555-6666', 'carlos.santos@email.com', 4, '2023-12-31', 800.00, 0, NOW(), NOW(), 3, 1, 34),
('Ana Souza', '9999-0000', 'ana.souza@email.com', 7, '2023-12-31', 1400.00, 1, NOW(), NOW(), 4, 2, 33),
('Rafael Lima', '7777-8888', 'rafael.lima@email.com', 5, '2023-12-31', 1000.00, 0, NOW(), NOW(), 5, 1, 36),
('Aline Oliveira', '3333-9999', 'aline.oliveira@email.com', 2, '2023-12-31', 400.00, 1, NOW(), NOW(), 6, 1, 35),
('Fernando Costa', '5555-1111', 'fernando.costa@email.com', 4, '2023-12-31', 800.00, 0, NOW(), NOW(), 7, 2, 38),
('Juliana Pereira', '2222-3333', 'juliana.pereira@email.com', 3, '2023-12-31', 600.00, 1, NOW(), NOW(), 8, 2, 37),
('Roberto Santos', '4444-5555', 'roberto.santos@email.com', 5, '2023-12-31', 1000.00, 0, NOW(), NOW(), 9, 1, 40),
('Camila Rocha', '6666-7777', 'camila.rocha@email.com', 5, '2023-12-31', 1000.00, 1, NOW(), NOW(), 10, 2, 39);

-- Inserir dados na tabela PessoaFisica
INSERT INTO PessoaFisica (Cpf, Id_Cliente)
VALUES
('11111111111', 1),
('22222222222', 2),
('33333333333', 3),
('44444444444', 4),
('55555555555', 5);

-- Inserir dados na tabela PessoaJuridica
INSERT INTO PessoaJuridica (Cnpj, Razao_social, Cliente_Id_Cliente)
VALUES
('66666666000106', 'Empresa 6', 6),
('77777777000107', 'Empresa 7', 7),
('88888888000108', 'Empresa 8', 8),
('99999999000109', 'Empresa 9', 9),
('12345678000100', 'Empresa 10', 10);
 

-- Inserir dados na tabela Encomenda
INSERT INTO Encomenda (Obs_Encomenda, Cliente_EnderecoFiscal_Num_End_Fiscal)
VALUES
('Obs 1', 31),
('Obs 2', 32),
('Obs 3', 33),
('Obs 4', 34),
('Obs 5', 35),
('Obs 6', 36),
('Obs 7', 37),
('Obs 8', 38),
('Obs 9', 39),
('Obs 10', 40);


-- Inserir dados na tabela Recepcao
INSERT INTO Recepcao (Id_Usuario)
VALUES
(3),
(4),
(5);

-- Inserir dados na tabela RecebimentoEncomenda
INSERT INTO RecebimentoEncomenda (DataHora_Receb_Encomenda, Obs_Receb_encomenda, Encomenda_Id_Encomenda, EnderecoFiscal_Num_End_Fiscal, Recepcao_Id_Recepcao)
VALUES
(NOW(), 'Recebimento 1', 1, 31, 1),
(NOW(), 'Recebimento 2', 2, 31, 2),
(NOW(), 'Recebimento 3', 3, 33, 3),
(NOW(), 'Recebimento 4', 4, 33, 1),
(NOW(), 'Recebimento 5', 5, 35, 2),
(NOW(), 'Recebimento 6', 6, 35, 3),
(NOW(), 'Recebimento 7', 7, 37, 1),
(NOW(), 'Recebimento 8', 8, 37, 2),
(NOW(), 'Recebimento 9', 9, 39, 3),
(NOW(), 'Recebimento 10', 10, 39, 1);

-- Inserir dados na tabela Representante
INSERT INTO Representante (Nome_Represent, Email_Represent, Status_Represent, Telefone_Represent, Updated_at_Represent, Created_at_Represent, Id_PJuridica)
VALUES
('Ana Silva', 'ana.silva@email.com', 0, '1111-1111', NOW(), NOW(), 1),
('Carlos Oliveira', 'carlos.oliveira@email.com', 1, '2222-2222', NOW(), NOW(), 2),
('Lucia Pereira', 'lucia.pereira@email.com', 0, '3333-3333', NOW(), NOW(), 3),
('Ricardo Santos', 'ricardo.santos@email.com', 1, '4444-4444', NOW(), NOW(), 4),
('Mariana Costa', 'mariana.costa@email.com', 0, '5555-5555', NOW(), NOW(), 5),
('Gustavo Lima', 'gustavo.lima@email.com', 1, '6666-6666', NOW(), NOW(), 1),
('Juliana Rocha', 'juliana.rocha@email.com', 0, '7777-7777', NOW(), NOW(), 2),
('Fernando Almeida', 'fernando.almeida@email.com', 1, '8888-8888', NOW(), NOW(), 3),
('Amanda Souza', 'amanda.souza@email.com', 0, '9999-9999', NOW(), NOW(), 4),
('Bruno Silva', 'bruno.silva@email.com', 1, '1010-1010', NOW(), NOW(), 5);


-- Inserir dados na tabela RetiradaEncomenda
INSERT INTO RetiradaEncomenda (DataHora_Retir_encomenda, Obs_Retir_encomenda, Encomenda_Id_Encomenda, Representante_Id_Represent)
VALUES
(NOW(), 'Retirada 1', 1, 2),
(NOW(), 'Retirada 2', 2, 4),
(NOW(), 'Retirada 3', 3, 6),
(NOW(), 'Retirada 4', 4, 8),
(NOW(), 'Retirada 5', 5, 10),
(NOW(), 'Retirada 6', 6, 2),
(NOW(), 'Retirada 7', 7, 4),
(NOW(), 'Retirada 8', 8, 6),
(NOW(), 'Retirada 9', 9, 8),
(NOW(), 'Retirada 10', 10, 10);

-- -----------------------------------------------------
-- Add Foreign Key Constraints
-- -----------------------------------------------------
ALTER TABLE `PessoaFisica` ADD CONSTRAINT `fk_PessoaFisica_Cliente`
  FOREIGN KEY (`Id_Cliente`)
  REFERENCES `Cliente` (`Id_Cliente`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `PessoaJuridica` ADD CONSTRAINT `fk_PessoaJuridica_Cliente`
  FOREIGN KEY (`Cliente_Id_Cliente`)
  REFERENCES `Cliente` (`Id_Cliente`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
  
  ALTER TABLE `Recepcao` ADD CONSTRAINT `FK_Recepcao`
  FOREIGN KEY (`Id_Usuario`)
  REFERENCES `Usuario` (`Id_Usuario`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
  
ALTER TABLE `Cliente` ADD CONSTRAINT `fk_Cliente_Endereco`
  FOREIGN KEY (`Endereco_Id_Endereco`)
  REFERENCES `Endereco` (`Id_Endereco`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `Cliente` ADD CONSTRAINT `fk_Cliente_Admin`
  FOREIGN KEY (`Admin_Id_Admin`)
  REFERENCES `Admin` (`Id_Admin`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `Cliente` ADD CONSTRAINT `fk_Cliente_EnderecoFiscal`
  FOREIGN KEY (`EnderecoFiscal_Num_End_Fiscal`)
  REFERENCES `EnderecoFiscal` (`Num_End_Fiscal`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `Encomenda` ADD CONSTRAINT `fk_Encomenda_Cliente`
  FOREIGN KEY (`Cliente_EnderecoFiscal_Num_End_Fiscal`)
  REFERENCES `Cliente` (`EnderecoFiscal_Num_End_Fiscal`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `RecebimentoEncomenda` ADD CONSTRAINT `fk_RecebimentoEncomenda_Encomenda`
  FOREIGN KEY (`Encomenda_Id_Encomenda`)
  REFERENCES `Encomenda` (`Id_Encomenda`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `RecebimentoEncomenda` ADD CONSTRAINT `fk_RecebimentoEncomenda_EnderecoFiscal`
  FOREIGN KEY (`EnderecoFiscal_Num_End_Fiscal`)
  REFERENCES `EnderecoFiscal` (`Num_End_Fiscal`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `RecebimentoEncomenda` ADD CONSTRAINT `fk_RecebimentoEncomenda_Recepcao`
  FOREIGN KEY (`Recepcao_Id_Recepcao`)
  REFERENCES `Recepcao` (`Id_Recepcao`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `Representante` ADD CONSTRAINT `fk_Representante_PessoaJuridica`
  FOREIGN KEY (`Id_PJuridica`)
  REFERENCES `PessoaJuridica` (`Id_PJuridica`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `RetiradaEncomenda` ADD CONSTRAINT `fk_RetiradaEncomenda_Encomenda`
  FOREIGN KEY (`Encomenda_Id_Encomenda`)
  REFERENCES `Encomenda` (`Id_Encomenda`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
  
ALTER TABLE `RetiradaEncomenda` ADD CONSTRAINT `fk_RetiradaEncomenda_Representante`
  FOREIGN KEY (`Representante_Id_Represent`)
  REFERENCES `Representante` (`Id_Represent`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;