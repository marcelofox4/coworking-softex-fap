interface IAdminUpdate {
    idUsuario?: number;
}

export default IAdminUpdate;


/**
 * CREATE TABLE IF NOT EXISTS `Admin` (
  `Id_Admin` INT NOT NULL,
  `Id_Usuario` INT NOT NULL,
  PRIMARY KEY (`Id_Admin`),
  CONSTRAINT `FK_Admin`
    FOREIGN KEY (`Id_Usuario`)
    REFERENCES `Usuario` (`Id_Usuario`)
    ON DELETE CASCADE
);
 */
 