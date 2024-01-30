interface IRepresentanteCreate {
    nomeRepresent: string;
    emailRepresent: string;
    telefoneRepresent: string;
    idPJuridica: number;
}

export default IRepresentanteCreate;

/**
 * CREATE TABLE IF NOT EXISTS `Representante` (
  `Id_Represent` INT NOT NULL,
  `Nome_Represent` VARCHAR(100) NOT NULL,
  `Email_Represent` VARCHAR(100) NOT NULL,
  `Status_Represent` TINYINT NOT NULL,
  `Telefone_Represent` VARCHAR(11) NOT NULL,
  `Updated_at_Represent` DATETIME NOT NULL,
  `Created_at_Represent` DATETIME NOT NULL,
  `Id_PJuridica` INT NOT NULL,
  `RetiradaEncomenda_Id_Retir_Encomenda` INT NOT NULL,
  PRIMARY KEY (`Id_Represent`),
  INDEX `fk_Representante_RetiradaEncomenda_idx` (`RetiradaEncomenda_Id_Retir_Encomenda`)
  -- FOREIGN KEY removed
);

ALTER TABLE `Representante` ADD CONSTRAINT `fk_Representante_PessoaJuridica`
  FOREIGN KEY (`Id_PJuridica`)
  REFERENCES `PessoaJuridica` (`Id_PJuridica`);
    
ALTER TABLE `Representante` ADD CONSTRAINT `fk_Representante_RetiradaEncomenda`
  FOREIGN KEY (`RetiradaEncomenda_Id_Retir_Encomenda`)
  REFERENCES `RetiradaEncomenda` (`Id_Retir_Encomenda`);
 */