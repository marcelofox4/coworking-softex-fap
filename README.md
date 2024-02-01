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

## Créditos

Link do repositório do projeto: [coworking_softex](https://github.com/ijbs-dev/coworking_softex)