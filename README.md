# Projeto Integrador - Formação Acelerada em Programação (FAP)

O projeto integrador é uma metodologia de execução do FAP. Consiste ele na identificação de desafios a
serem postos pelas empresas parceiras. Cada desafio será um projeto de desenvolvimento de software
executado por uma equipe de aluno(a)s do programa FAP. Esse processo consiste no cerne do desenvolvimento de todo o treinamento visando a aprendizagem baseado em problemas reais.

## Escopo do projeto

O **Coworking Mangue Space da Softex** é um dos diversos serviços oferecidos pela SOFTEX Recife para seus clientes. Quando os clientes contratam o serviço de coworking, têm a possibilidade de ter um Endereço Fiscal, através do qual as empresas podem registrar-se e receberem correspondências na recepção do Empresarial ITBC. Assim, nossa equipe ficou responsável pelo módulo de cadastramento e gestão dos Clientes e dos Endereços Fiscais.

### Status do Projeto

 ![Projeto Em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

<br>


## Índice
* [Detalhamento do Projeto](#Detalhamento-do-Projeto)
* [Demandas da Cliente](#Demandas-da-Cliente)
* [Usuários](#usuários)
* [Tecnologias](#tecnologias)
* [Funcionalidades](#Funcionalidades)
* [Endpoints da API](#Endpoints-da-API)
  * [Usuário](#Usuário)
  * [Cliente](#Cliente)
  * [Endereço Fiscal](#Endereço-Fiscal)
  * [Representante](#Representante)
  * [Recebimento de encomenda](#Recebimento-de-encomenda)
  * [Retirada de Encomenda](#Retirada-de-Encomenda)

* [Créditos](#Créditos)

<br>

## Detalhamento do Projeto: 

O projeto ainda foi subdividido em 3 grupos: 

1. **Um time de Back-End para o módulo de gestão de endereços fiscais e cadastramento de clientes.**
2. Outro time de Back-End para o módulo de gestão do uso das salas de reunião no Mangue Space da Softex.
3. Um único time de Front-End para criação de todas as páginas necessárias para o projeto.

<br>

## Demandas da Cliente

A gestão de endereços fiscais e cadastramento de clientes, atualmente, é feita via planilha de Excel. Para o recebimento de encomendas na recepção do Empresarial ITBC, é impressa uma planilha com as empresas ativas e aptas a receber encomendas, então a recepção consulta manualmente cada uma delas quando necessário. Porém, como não é possível atualizar de forma ágil essa versão em papel, o serviço é afetado e a gestora do Coworking, é frequentemente consultada para verificar se a empresa está com o cadastro ativo ou não para que a recepção aceite a encomenda. Após o recebimento da encomenda pela recepção, a mesma e entregue para a gestora do coworking, e ela, manualmente, notifica os clientes, via whatsapp, quanto a retirada das encomendas no próprio coworking. O sistema deverá servir tanto para a gestora quanto para a recepção, não sendo necessário qualquer funcionalidade para as empresas.

<br>

A API(Application Programing Interface) de Endereço Fiscal é um módulo do Sistema de Gerenciamento do Coworking Mangue Space, esse módulo será responsável pelo cadastramento dos clientes no sistema, manipulação e atualização dos cadastros, ativar e desativar cadastros de clientes e exibir a listagem dos clientes com cadastro ativo aptos para recebimento de encomendas e correspondências na recepção do prédio ITBC. No caso de recebimento da encomenda pela recepção, será adicionado a informação de horário e data do recebimento, a fim de deixar registrado para consulta da gestora do coworking. Assim que o recebimento for confirmado, o representante da empresa será notificado automaticamente via WhatsApp e por email.

<br>

## Usuários

- Adminstração do Mangue Space
- Recepção da Softex

<br>

## Tecnologias

1. Linguagem: JavaScript;
    - Superset: TypeScript;
2. Framework: NodeJS;
3. Módulos: 
    - Express;
    - CORS;
    - JSON Web Token;
    - DotEnv;
    - Nodemailer
4. ORM: TypeORM;
5. Gerenciamento de Mensagens WhatsApp: Twilio
6. Banco de Dados: MySQL;
7. Documentação: Swagger;
8. Versionamento: GitHub;

<br>

## Funcionalidades

✔️ Autenticação de **usuário**;

✔️ Cadastramento de **usuários**:

- Administrador;
- Recepção.

✔️ Ativação e Inativação de **usuários**;

✔️ Listagem de **usuários** ativos e inativos;

✔️ Busca de **usuários**;

✔️ Atualização de informações do **usuário**;

✔️ Cadastramento de **clientes**:

- Pessoa Física;
- Pessoa Jurídica.

✔️ Ativação e Inativação de **clientes**;

✔️ Listagem de **clientes** ativos, inativos, cpf, cnpj;

✔️ Busca de **clientes**;

✔️ Atualização de informações do **cliente**;

✔️ Ativação e Inativação de endereços fiscais;

✔️ Busca de **endereço fiscal**;

✔️ Cadastramento de **representantes** de clientes CNPJ:

✔️ Ativação e Inativação de **representantes**;

✔️ Listagem de **representantes** ativos e inativos;

✔️ Busca de **representante**;

✔️ Atualização de informações do **representante**;

✔️ Deleção de **representante**;

✔️ Cadastramento de **recebimento de encomendas**;

✔️ Listagem dos **recebimentos de encomendas**;

✔️ Busca de um **recebimento de encomenda**;

✔️ Cadastramento de **retirada de encomendas**;

✔️ Listagem dos **retiradas de encomendas**;

✔️ Busca de uma **retirada de encomenda**;

<br>

## Endpoints da API

### Usuário

#### `POST /usuario/autenticacao`

Deverá ser possível que um **usuário** possa se autenticar no sistema.

**Request body:**

```
{
  "email": "admin@email.com",
  "senha": "admin"
}
```

**Responses:**

- 200 - Ok

  - Content-Type: application/json

    ```
    {
      "token": "string",
      "user": {
        "email": "string",
        "senha": "string"
      }
    }
    ```

- 400 - E-mail ou senha incorretos!

<br>

#### `POST /usuario/admin`

Deverá ser possível que um **usuário administrador** possa cadastrar outros usuários administradores.

**Request body:**

```
{
  "nomeUsuario": "Marcelo Raposo",
  "funcaoUsuario": "Desenvolvedor Back-End",
  "emailUsuario": "marcelo.raposo@email.com",
  "loginUsuario": "marcelofox",
  "senhaUsuario": "pass123"
}
```

**Responses:**

- 200 - Usuário Administrador cadastrado!

- 400 - Usuário já existente!
- 401 - Não Autorizado!

<br>

#### `POST /usuario/recepcao`

Deverá ser possível que um **usuário administrador** possa cadastrar outros usuários da recepção para recebimento de encomendas.

**Request body:**

```
{
  "nomeUsuario": "João da Silva",
  "funcaoUsuario": "Segurança",
  "emailUsuario": "joao.silva@email.com",
  "loginUsuario": "joaosilva",
  "senhaUsuario": "pass123"
}
```

**Responses:**

- 200 - Usuário Recepção cadastrado!

- 400 - Usuário já existente!
- 401 - Não Autorizado!

<br>

#### `GET /usuario/ativos`

Deverá ser possível que um **usuário administrador** possa listar todos os usuários que estão cadastrados e ativos, na base de dados do sistema.

**Responses:**

- 200 - Ok

  - Content-Type: application/json

    ```
    {
      "idUsuario": 0,
      "statusUsuario": "string",
      "nomeUsuario": "string",
      "funcaoUsuario": "string",
      "emailUsuario": "string",
      "loginUsuario": "string",
      "senhaUsuario": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

- 401 - Não Autorizado!

<br>

#### `GET /usuario/email/{email}`

Deverá ser possível que um **usuário administrador** possa buscar um usuário que está cadastrado, na base de dados do sistema.

**Parameters:**

| Name           | Description                 |
| :------------- | :-------------------------- |
| email (string) | Email do Usuário para busca |

**Responses:**

- 200 - Ok

  - Content-Type: application/json

    ```
    {
      "idUsuario": 0,
      "statusUsuario": "string",
      "nomeUsuario": "string",
      "funcaoUsuario": "string",
      "emailUsuario": "string",
      "loginUsuario": "string",
      "senhaUsuario": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

- 400 - Usuário não encontrado!
- 401 - Não Autorizado!

<br>

#### `PATCH /usuario/ativar/{id}`

Deverá ser possível que um **usuário administrador** possa ativar um usuário.

**Parameters:**

| Name        | Description                 |
| :---------- | :-------------------------- |
| id (number) | Id do Usuário para ativação |

**Responses:**

- 200 - Usuário ativado!

- 400 - Usuário não encontrado! || Usuário já está ativo!
- 401 - Não Autorizado!

<br>

#### `PATCH /usuario/inativar/{id}`

Deverá ser possível que um **usuário administrador** possa inativar um usuário.

**Parameters:**

| Name        | Description                   |
| :---------- | :---------------------------- |
| id (number) | Id do Usuário para inativação |

**Responses:**

- 200 - Usuário inativado!

- 400 - Usuário não encontrado! || Usuário já está inativo!
- 401 - Não Autorizado!

<br>

#### `PUT /usuario/{id}`

Deverá ser possível que um **usuário** possa modificar/atualizar seus dados.

**Parameters:**

| Name        | Description                   |
| :---------- | :---------------------------- |
| id (number) | Id do Usuário para inativação |

**Request body:**

```
{
  "nomeUsuario": "Charlie Brownn",
  "senhaUsuario": "passworddeff"
}
```

**Responses:**

- 200 - Ok!

- 400 - Usuário não encontrado!
- 401 - Não Autorizado!

<br>

#### `DELETE /usuario/{id}`

Deverá ser possível que um **usuário administrador** possa deletar um usuário.

**Parameters:**

| Name        | Description                |
| :---------- | :------------------------- |
| id (number) | Id do Usuário para deleção |

**Responses:**

- 200 - Usuário inativado!

- 400 - Usuário não encontrado!
- 401 - Não Autorizado!

<br>

### Cliente

#### `POST /cadastroCliente/pessoaFisica`

Deverá ser possível que um **usuário administrador** possa cadastrar um cliente Pessoa Física na base de dados do sistema.

**Request body:**

```
{
  "nomeCliente": "João Pedro",
  "cpf": "00011122244",
  "telefoneCliente": "4444-8888",
  "emailCliente": "contato@lojaspedros.com",
  "qtdPontosCliente": 2,
  "prazoCliente": "2024-01-14",
  "valorMensalCliente": "400",
  "logradouro": "Rua João Pedro",
  "numero": 255,
  "bairro": "Bairro do Recife",
  "uf": "PE",
  "numEndFiscal": 70,
  "idUsuario": 1
}
```

**Responses:**

- 200 - Cliente cadastrado com sucesso!

- 400 - Requisição Inválida!
- 401 - Não Autorizado!

<br>

#### `POST /cadastroCliente/pessoaJuridica`

Deverá ser possível que um **usuário administrador** possa cadastrar um cliente Pessoa Jurídica na base de dados do sistema.

**Request body:**

```
{
  "nomeCliente": "Walter Wagner",
  "razaoSocial": "Walter LTDA",
  "cnpj": "05311244000177",
  "telefoneCliente": "2222-3333",
  "emailCliente": "walter.limitada@email.com",
  "qtdPontosCliente": 2,
  "prazoCliente": "2024-01-13",
  "valorMensalCliente": "400",
  "logradouro": "rua do frevo",
  "numero": 500,
  "bairro": "Bairro do Recife",
  "uf": "PE",
  "numEndFiscal": 42,
  "idUsuario": 1,
  "nomeRepresent": "Richele Praxedes",
  "emailRepreset": "richele@gmail.com",
  "telefoneRepresent": "5555-4444"
}
```

**Responses:**

- 200 - Cliente cadastrado com sucesso!

- 400 - Requisição Inválida!
- 401 - Não Autorizado!

<br>

#### `GET /cliente/ativados`

Deverá ser possível que um **usuário** possa listar todos os Clientes que estão cadastrados e ativos na base de dados do sistema.

**Responses:**

- 200 - Ok;

- 401 - Não Autorizado!

<br>

#### `GET /cliente/inativados`

Deverá ser possível que um **usuário administrador** possa listar todos os Clientes que estão cadastrados e inativos, na base de dados do sistema.

**Responses:**

- 200 - Ok;

- 401 - Não Autorizado!

<br>

#### `GET /cadastroCliente/cnpj/{cnpj}`

Deverá ser possível que um **usuário** possa buscar um Cliente pelo número de CNPJ na base de dados do sistema.

**Parameters:**

| Name          | Description                |
| :------------ | :------------------------- |
| cnpj (string) | CNPJ do Cliente para busca |

**Responses:**

- 200 - Ok

  - Content-Type: application/json

    ```
    {
      "statusCliente": 0,
      "createdAtCliente": "Unknown Type: datetime",
      "updatedAtCliente": "Unknown Type: datetime",
      "idCliente": 0,
      "nomeCliente": "string",
      "telefoneCliente": "string",
      "emailCliente": "string",
      "qtdPontosCliente": 0,
      "prazoCliente": "Unknown Type: date",
      "enderecoIdEndereco": 0,
      "adminIdAdmin": 0,
      "enderecoFiscalNumEndFiscal": 0
    }
    ```

- 400 - Não existe um Cliente com este CNPJ

- 401 - Não Autorizado!

<br>

#### `GET /cadastroCliente/cpf/{cpf}`

Deverá ser possível que um **usuário** possa buscar um Cliente pelo número de CPF na base de dados do sistema.

**Parameters:**

| Name         | Description               |
| :----------- | :------------------------ |
| cpf (string) | CPF do Cliente para busca |

**Responses:**

- 200 - Ok

  - Content-Type: application/json

    ```
    {
      "statusCliente": 0,
      "createdAtCliente": "Unknown Type: datetime",
      "updatedAtCliente": "Unknown Type: datetime",
      "idCliente": 0,
      "nomeCliente": "string",
      "telefoneCliente": "string",
      "emailCliente": "string",
      "qtdPontosCliente": 0,
      "prazoCliente": "Unknown Type: date",
      "enderecoIdEndereco": 0,
      "adminIdAdmin": 0,
      "enderecoFiscalNumEndFiscal": 0
    }
    ```

- 400 - Não existe um Cliente com este CPF

- 401 - Não Autorizado!

<br>

#### `GET /cliente/id/{id}`

Deverá ser possível que um **usuário** possa buscar um Cliente pelo número do ID na base de dados do sistema.

**Parameters:**

| Name        | Description              |
| :---------- | :----------------------- |
| id (number) | ID do Cliente para busca |

**Responses:**

- 200 - Ok

  - Content-Type: application/json

    ```
    {
      "statusCliente": 0,
      "createdAtCliente": "Unknown Type: datetime",
      "updatedAtCliente": "Unknown Type: datetime",
      "idCliente": 0,
      "nomeCliente": "string",
      "telefoneCliente": "string",
      "emailCliente": "string",
      "qtdPontosCliente": 0,
      "prazoCliente": "Unknown Type: date",
      "enderecoIdEndereco": 0,
      "adminIdAdmin": 0,
      "enderecoFiscalNumEndFiscal": 0
    }
    ```

- 400 - Cliente não encontrado!

- 401 - Não Autorizado!

<br>

#### `PATCH /cadastroCliente/ativar/{id}`

Deverá ser possível que um **usuário administrador** possa ativar um Cliente que foi inativado. Observações: Quando a ativação do Cliente for efetuada com sucesso, o endereço postal, e os representantes do mesmo, caso seja uma PJ, deverão ser ativados.

**Parameters:**

| Name        | Description                 |
| :---------- | :-------------------------- |
| id (number) | Id do Cliente para ativação |

**Responses:**

- 200 - Cadastro de Cliente ativado!

- 400 - Cliente não encontrado! || Cliente já se encontra ativo no sistema!
- 401 - Não Autorizado!

<br>

#### `PATCH /cadastroCliente/inativar/{id}`

Deverá ser possível que um **usuário administrador** possa inativar um Cliente, isso acontece quando o usuário administrador o faz ou quando acaba o prazo de contrato. A inativação do cliente é um artifício utilizado para impedir que um cliente já cadastrado seja excluído por completo da base de dados, pois ele pode ser ativado novamente a qualquer momento. Observações: Quando a inativação do Cliente for efetuada com sucesso, o endereço postal, e os representantes do mesmo, caso seja uma PJ, deverão ser inativados.

**Parameters:**

| Name        | Description                   |
| :---------- | :---------------------------- |
| id (number) | Id do Cliente para inativação |

**Responses:**

- 200 - Cadastro de Cliente ativado!

- 400 - Cliente não encontrado! || Cliente já se encontra inativo no sistema!
- 401 - Não Autorizado!

<br>

#### `PATCH /cadastroCliente/{id}`

Deverá ser possível que um **usuário administrador** possa modificar/atualizar dados de um Cliente da base de dados do sistema.

**Parameters:**

| Name        | Description              |
| :---------- | :----------------------- |
| id (number) | Id do Cliente para busca |

**Request body:**

```
{
  "telefoneCliente": "0000-0000",
  "emailCliente": "atualizado@email.com",
  "qtdPontosCliente": 1,
  "prazoCliente": "2024-01-14",
  "valorMensalCliente": 750,
  "logradouro": "Rua modificada",
  "numero": 211,
  "bairro": "Bairro modificado",
  "uf": "RJ"
}
```

**Responses:**

- 200 - Cadastro de Cliente atualizado!

- 400 -  Cliente não encontrado!
- 401 - Não Autorizado!

<br>

### Endereço Fiscal

#### `GET /enderecofiscal/ativos`

Deverá ser possível que um **usuário** possa listar todos os Endereços Fiscais que estão cadastrados e ativos na base de dados do sistema.

**Responses:**

- 200 - Ok;

- 401 - Não Autorizado!

<br>

#### `GET /enderecofiscal/inativos`

Deverá ser possível que um **usuário administrador** possa listar todos os Endereços Fiscais que estão cadastrados e inativos na base de dados do sistema.

**Responses:**

- 200 - Ok;

- 401 - Não Autorizado!

<br>

#### `GET /enderecofiscal/{numEndFiscal}`

Deverá ser possível que um **usuário** possa buscar um Endereços Fiscais que está cadastrado na base de dados do sistema.

**Parameters:**

| Name                  | Description                          |
| :-------------------- | :----------------------------------- |
| numEndFiscal (number) | Número de Endereço Fiscal para busca |

**Responses:**

- 200 - Ok

  - Content-Type: application/json

    ```
    {
      "statusEndFiscal": 0,
      "numEndFiscal": 0,
      "createdAtEndFiscal": "Unknown Type: datetime",
      "updatedAtEndFiscal": "Unknown Type: datetime"
    }
    ```

- 400 - Endereço Fiscal não encontrado!

- 401 - Não Autorizado!

<br>

### Representante

#### `POST /representante`

Deverá ser possível um **usuário administrador** fazer o cadastramento de representantes da empresa na base de dados do sistema.

**Request body:**

```
{
  "nomeRepresent": "Carlos Pena",
  "emailRepresent": "carlos.pena@HOTMAIL.com",
  "telefoneRepresent": "1981-1711",
  "idPJuridica": 3
}
```

**Responses:**

- 200 - Representante Cadastrado!

- 400 - Representante já cadastrado com este E-mail!
- 401 - Não Autorizado!

<br>

#### `GET /representante/ativos`

Deverá ser possível que um **usuário** possa listar todos os Representantes que estão cadastrados e ativos, na base de dados do sistema.

**Responses:**

- 200 - Ok;

- 401 - Não Autorizado!

<br>

#### `GET /representante/inativos`

Deverá ser possível que um **usuário administrador** possa listar todos os Representantes que estão cadastrados e inativos, na base de dados do sistema.

**Responses:**

- 200 - Ok;

- 401 - Não Autorizado!

<br>

#### `GET /representante/email/{email}`

Deverá ser possível que um **usuário** possa buscar um Representante pelo número do E-mail na base de dados do sistema.

**Parameters:**

| Name           | Description                        |
| :------------- | :--------------------------------- |
| email (string) | E-mail do Representante para busca |

**Responses:**

- 200 - Ok

  - Content-Type: application/json

    ```
    {
      "statusRepresent": 0,
      "idRepresent": 0,
      "nomeRepresent": "string",
      "emailRepresent": "string",
      "telefoneRepresent": "string",
      "updatedAtRepresent": "Unknown Type: datetime",
      "createdAtRepresent": "Unknown Type: datetime",
      "idPJuridica": 0
    }
    ```

- 400 - Representante não encontrado!

- 401 - Não Autorizado!

<br>

#### `PATCH /representante/ativar/{id}`

Deverá ser possível que um **usuário administrador** possa ativar um Representante que foi inativado.

**Parameters:**

| Name        | Description                       |
| :---------- | :-------------------------------- |
| id (number) | Id do Representante para ativação |

**Responses:**

- 200 - Representante ativado!

- 400 - Representante não encontrado! || Representante já está ativo!
- 401 - Não Autorizado!

<br>

#### `PATCH /representante/inativar/{id}`

Deverá ser possível que um **usuário administrador** possa inativar um Representante. A inativação do representante é um artifício utilizado para impedir que um Representante já cadastrado seja excluído por completo da base de dados, pois ele pode ser ativado novamente a qualquer momento.

**Parameters:**

| Name        | Description                         |
| :---------- | :---------------------------------- |
| id (number) | Id do Representante para inativação |

**Responses:**

- 200 - Representante inativado!

- 400 - Representante não encontrado! || Representante já está Inativo!
- 401 - Não Autorizado!

<br>

#### `PATCH /representante/{id}`

Deverá ser possível que um **usuário administrador** possa modificar/atualizar dados de um Representante da base de dados do sistema.

**Parameters:**

| Name        | Description                    |
| :---------- | :----------------------------- |
| id (number) | Id do Representante para busca |

**Request body:**

```
{
  "emailRepresent": "atualizado@email.com",
  "telefoneRepresent": "0000-0000"
}
```

**Responses:**

- 200 - Representante atualizado!

- 400 - Representante não encontrado!
- 401 - Não Autorizado!

<br>

#### `DELETE /usuario/{id}`

Deverá ser possível que um **usuário administrador** possa deletar um Representante com base no ID fornecido.

**Parameters:**

| Name        | Description                     |
| :---------- | :------------------------------ |
| id (number) | ID do Representante para Apagar |

**Responses:**

- 200 - Representante excluido!

- 400 - Representante não encontrado!
- 401 - Não Autorizado!

<br>

### Recebimento de encomenda

#### `POST /recebimentoencomenda/`

O recebimento de encomendas acontece na recepção do ITBC. Um **usuário** da recepção deverá identificar se existe um Cliente ativo para poder receber a encomenda recém chegada. Após a verificação e constatação de cadastro ativo, o usuário terminará o recebimento e o representante cadastrado no Cliente, receberá uma notificação via Whatsapp e E-mail.

**Request body:**

```
{
  "obsEncomenda": "Encomenda um pouco avariada nas extremidades",
  "obsRecebEncomenda": "Entregue pelos Correios",
  "numEndFiscal": 44,
  "idRecepcao": 2
}
```

**Responses:**

- 200 - Recebimento de Encomenda cadastrado!

- 400 - Requisição Inválida!
- 401 - Não Autorizado!

<br>

#### `GET /recebimentoencomenda/`

Deverá ser possível que um **usuário** possa listar todos os Recebimentos de Encomendas que estão cadastrados, na base de dados do sistema.

**Responses:**

- 200 - Ok;

- 401 - Não Autorizado!

<br>

#### `GET /recebimentoencomenda/id`

Deverá ser possível que um **usuário** possa buscar um Recebimento de Encomenda pelo número do ID na base de dados do sistema.

**Parameters:**

| Name        | Description                               |
| :---------- | :---------------------------------------- |
| id (number) | ID do Recebimento de Encomenda para busca |

**Responses:**

- 200 - Ok

  - Content-Type: application/json

    ```
    {
      "dataHoraRecebEncomenda": "Unknown Type: datetime",
      "idRecebEncomenda": 0,
      "obsRecebEncomenda": "string",
      "encomendaIdEncomenda": 0,
      "enderecoFiscalNumEndFiscal": 0,
      "idRecepcao": 0
    }
    ```

- 400 -  Recebimendo de Encomenda não encontrado!

- 401 - Não Autorizado!

<br>

### Retirada de Encomenda

#### `POST /retiradaencomenda/`

A retirada de encomendas acontece na recepção do ITBC. Um **representante** do Cliente PJ deverá identificar se existe um Cliente ativo para poder retirar a encomenda recém chegada. Após a verificação e constatação de cadastro ativo, o representante fará a retirada da encomenda.

**Request body:**

```
{
  "idRetirEncomenda": 14,
  "dataHoraRetirEncomenda": "2024-01-09T22:34:54.000Z",
  "obsRetirEncomenda": "Entregue pelos Correios",
  "idEncomenda": 6,
  "idRepresent": 2
}
```

**Responses:**

- 200 - Retirada de Encomenda cadastrado!

- 400 - Requisição Inválida!
- 401 - Não Autorizado!

<br>

#### `GET /retiradaencomenda/`

Deverá ser possível que um **representante** possa listar todos as Retiradas de Encomendas que estão cadastrados, na base de dados do sistema.

**Responses:**

- 200 - Ok;

- 401 - Não Autorizado!

<br>

#### `GET /retiradaencomenda/id`

Deverá ser possível que um **representante** possa buscar uma Retirada de Encomenda pelo número do ID na base de dados do sistema.

**Parameters:**

| Name        | Description                            |
| :---------- | :------------------------------------- |
| id (number) | ID do Retirada de Encomenda para busca |

**Responses:**

- 200 - Ok

  - Content-Type: application/json

    ```
    {
      "dataHoraRetirEncomenda": "Unknown Type: datetime",
      "idRetirEncomenda": 0,
      "obsRetirEncomenda": "string",
      "idEncomenda": 0,
      "idRepresent": 0
    }
    ```

- 400 -  Retirada de Encomenda não encontrado!

- 401 - Não Autorizado!

## Créditos

Link do repositório do projeto: [coworking_softex](https://github.com/ijbs-dev/coworking_softex)