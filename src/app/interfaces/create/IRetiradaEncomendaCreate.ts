interface IRetiradaEncomendaCreate {
    idRetirEncomenda: number;
    dataHoraRetirEncomenda: Date;
    obsRetirEncomenda: string;
    encomendaIdEncomenda: number;
}

export default IRetiradaEncomendaCreate;

/**
 * CREATE TABLE IF NOT EXISTS `RetiradaEncomenda` (
  `Id_Retir_Encomenda` INT NOT NULL,
  `DataHora_Retir_encomenda` DATETIME NOT NULL,
  `Obs_Retir_encomenda` VARCHAR(200) NOT NULL,
  `Encomenda_Id_Encomenda` INT NOT NULL,
  PRIMARY KEY (`Id_Retir_Encomenda`, `Encomenda_Id_Encomenda`),
  INDEX `fk_RetiradaEncomenda_Encomenda_idx` (`Encomenda_Id_Encomenda`)
  -- FOREIGN KEY removed
);

ALTER TABLE `RetiradaEncomenda` ADD CONSTRAINT `fk_RetiradaEncomenda_Encomenda`
  FOREIGN KEY (`Encomenda_Id_Encomenda`)
  REFERENCES `Encomenda` (`Id_Encomenda`);
 */