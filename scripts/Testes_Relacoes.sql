use coworking;

-- 1. Listar todos os clientes e seus endereços:
SELECT
    Cliente.Id_Cliente,
    Cliente.Nome_Cliente,
    Cliente.Telefone_Cliente,
    Cliente.Email_Cliente,
    Endereco.Logradouro,
    Endereco.Numero,
    Endereco.Bairro,
    Endereco.UF
FROM
    Cliente, Endereco
WHERE
    Cliente.Endereco_Id_Endereco = Endereco.Id_Endereco;    

-- 1. Listar todos os admin e seus usuarios
SELECT A.*, U.*
FROM Admin A
JOIN Usuario U ON A.Id_Usuario = U.Id_Usuario;

-- 2. Listar Recepcao e seus usuarios
SELECT R.*, U.*
FROM Recepcao R
JOIN Usuario U ON R.Id_Usuario = U.Id_Usuario;

-- 3. Listar Cliente e seus End.Fiscal, Endereco, Admin
SELECT C.*, EF.*, E.*, Ad.*
FROM Cliente C
JOIN EnderecoFiscal EF ON C.EnderecoFiscal_Num_End_Fiscal = EF.Num_End_Fiscal
JOIN Endereco E ON C.Endereco_Id_Endereco = E.Id_Endereco
JOIN Admin Ad ON C.Admin_Id_Admin = Ad.Id_Admin;

-- 4. Listar Pessoa Fisica e seus Clientes
SELECT PF.*, C.*
FROM PessoaFisica PF
JOIN Cliente C ON PF.Id_Cliente = C.Id_Cliente;

-- 5. Listar Pessoa Juridica e seus Clientes
SELECT PJ.*, C.*
FROM PessoaJuridica PJ
JOIN Cliente C ON PJ.Cliente_Id_Cliente = C.Id_Cliente;

-- 6. Listar Representante e seus PessoaJuridica
SELECT R.*, PJ.*
FROM Representante R
JOIN PessoaJuridica PJ ON R.Id_PJuridica = PJ.Id_PJuridica;

-- 7. Listar RetiradaEncomenda e seus Encomenda, Representante
SELECT RE.*, E.*, R.*
FROM RetiradaEncomenda RE
JOIN Encomenda E ON RE.Encomenda_Id_Encomenda = E.Id_Encomenda
JOIN Representante R ON RE.Representante_Id_Represent = R.Id_Represent;

-- 8. Listar RecebimentoEncomenda e seus Encomenda, EnderecoFiscal, Recepcao
SELECT RE.*, E.*, EF.*, R.*
FROM RecebimentoEncomenda RE
JOIN Encomenda E ON RE.Encomenda_Id_Encomenda = E.Id_Encomenda
JOIN EnderecoFiscal EF ON RE.EnderecoFiscal_Num_End_Fiscal = EF.Num_End_Fiscal
JOIN Recepcao R ON RE.Recepcao_Id_Recepcao = R.Id_Recepcao;
