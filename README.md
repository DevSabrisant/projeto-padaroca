# Padaroca

> Sistema web de gerenciamento para uma padaria, desenvolvido como
> projeto de portfólio com JavaScript puro.

O **Padaroca** é uma aplicação front-end criada para simular a rotina de
atendimento e gerenciamento de uma padaria. O projeto reúne
funcionalidades de cardápio, carrinho, pedidos, histórico, gerenciamento
de usuários e controle de permissões em uma interface responsiva com
identidade visual própria.

A aplicação está sendo construída com foco em **organização de código,
modularização, experiência do usuário e evolução gradual da
arquitetura**, preparando o projeto para uma futura integração com
backend.

------------------------------------------------------------------------

## Status do projeto

**Em desenvolvimento --- Front-end**

A base funcional do sistema já está estruturada e o projeto está
passando por etapas de refinamento visual, regras de negócio e
organização da arquitetura.

### Etapas atuais

-   [x] Estrutura inicial da aplicação
-   [x] Cardápio e categorias
-   [x] Carrinho
-   [x] Histórico de pedidos
-   [x] Sistema de autenticação
-   [x] Perfil do usuário
-   [x] Gerenciamento de usuários
-   [x] Controle de permissões por cargo
-   [x] Alteração de credenciais do administrador
-   [x] Validação básica de senha
-   [x] Dark Mode
-   [x] Modularização do JavaScript
-   [x] Refinamento completo de usuários e permissões
-   [ ] Gerenciamento de produtos
-   [ ] Finalização do fluxo de pedidos
-   [ ] Dashboard
-   [ ] Testes e polimento geral
-   [ ] Backend e banco de dados

------------------------------------------------------------------------

## Funcionalidades

### Cardápio

-   Organização dos produtos por categorias
-   Busca de produtos
-   Filtros por categoria
-   Cards de produtos
-   Adição de itens ao carrinho

Categorias utilizadas atualmente:

-   Cafés
-   Pães
-   Tapiocas
-   Cuscuz
-   Crepiocas
-   Doces e Salgados
-   Bebidas

### Carrinho

-   Adição e remoção de produtos
-   Controle de quantidade
-   Cálculo do total
-   Observação do pedido
-   Identificação do cliente
-   Preparação para finalização do pedido
-   Impressão de comanda

### Pedidos e histórico

A aplicação possui estrutura para registrar pedidos e disponibilizar o
histórico das operações realizadas.

### Perfil

O usuário pode visualizar e editar seus dados pessoais e endereço,
mantidos de forma persistida na aplicação.

O administrador possui recursos adicionais para gerenciamento das
próprias credenciais:

-   Alteração do nome de usuário
-   Alteração da senha
-   Alteração independente do usuário e da senha
-   Validação mínima de senha
-   Bloqueio de nomes de usuário duplicados

A senha atual nunca é carregada para o formulário de edição.

### Gerenciamento de usuários

O administrador possui uma área específica para:

-   Criar usuários
-   Editar outros usuários
-   Alterar cargo
-   Alterar nome de usuário
-   Alterar senha
-   Alterar dados pessoais e endereço
-   Ativar usuários
-   Desativar usuários
-   Excluir usuários

Regras implementadas:

-   Apenas administradores podem acessar o gerenciamento de usuários.
-   O administrador não pode editar a própria conta pela área de
    usuários.
-   O administrador não pode desativar a própria conta.
-   O administrador não pode excluir a própria conta.
-   Nomes de usuário duplicados são bloqueados.
-   E-mails são validados no cadastro e na edição.
-   A busca automática de CEP via ViaCEP está disponível no cadastro e
    na edição, preenchendo os dados de endereço.
-   Usuários comuns não podem alterar suas próprias credenciais.

A própria conta do administrador é gerenciada pela área **Meu Perfil**.

### Tema

-   Light Mode
-   Dark Mode
-   Persistência da preferência de tema

------------------------------------------------------------------------

## Tecnologias

O projeto utiliza tecnologias nativas da web:

-   **HTML5**
-   **CSS3**
-   **JavaScript (ES Modules)**
-   **LocalStorage**
-   **Git / GitHub**

Não há framework JavaScript obrigatório na camada atual do projeto.

A aplicação utiliza módulos ES para separar responsabilidades e reduzir
a concentração de lógica em um único arquivo.

------------------------------------------------------------------------

## Estrutura do projeto

A estrutura atual segue uma organização aproximada como:

``` text
padaroca/
│
├── assets/
│   └── imagens e recursos visuais
│
├── data/
│   └── produtos.js
│
├── js/
│   ├── auth.js
│   ├── cart.js
│   ├── filters.js
│   ├── icons.js
│   ├── profile.js
│   ├── selectors.js
│   ├── storage.js
│   ├── theme.js
│   ├── users.js
│   ├── utils.js
│   └── script.js
│
├── index.html
├── login.html
├── profile.html
├── style.css
└── README.md
```

> A estrutura pode evoluir conforme novas funcionalidades forem
> incorporadas ao projeto.

------------------------------------------------------------------------

## Arquitetura JavaScript

O JavaScript foi dividido em módulos com responsabilidades específicas.

### `auth.js`

Responsável pela autenticação e gerenciamento do usuário atualmente
logado.

### `storage.js`

Centraliza operações de persistência utilizando `localStorage`.

### `selectors.js`

Centraliza os elementos do DOM utilizados pelos módulos.

### `cart.js`

Concentra a lógica relacionada ao carrinho e seus itens.

### `filters.js`

Gerencia busca, filtros e exibição das categorias do cardápio.

### `users.js`

Responsável pelo gerenciamento de usuários, cargos, status, criação,
edição e exclusão.

### `profile.js`

Gerencia o perfil do usuário, dados pessoais, endereço e credenciais do
administrador.

### `theme.js`

Gerencia a preferência de tema da aplicação.

### `utils.js`

Reúne funções auxiliares reutilizáveis, como tratamento e formatação de
valores.

### `icons.js`

Centraliza recursos relacionados aos ícones utilizados na interface.

### `script.js`

Atua como ponto de inicialização e integração dos módulos principais da
aplicação.

------------------------------------------------------------------------

## Persistência atual

Enquanto o backend ainda não foi implementado, os dados são armazenados
no navegador utilizando `localStorage`.

Algumas chaves utilizadas atualmente incluem:

``` text
padaroca-users
padaroca-current-user
padaroca-theme
padaroca-cart
```

Essa abordagem permite desenvolver e testar o fluxo completo da
aplicação no front-end antes da implementação de uma API e de um banco
de dados.

### Atenção

A persistência atual é **apenas para fins de protótipo e
desenvolvimento**.

As credenciais ainda são armazenadas no `localStorage`, portanto esta
versão **não deve ser utilizada como sistema de produção**.

Na futura implementação do backend, a autenticação deverá ser
transferida para uma arquitetura segura, com armazenamento adequado de
senhas, sessões/tokens e controle de autorização no servidor.

------------------------------------------------------------------------

## Como executar

Como o projeto utiliza JavaScript com módulos ES, recomenda-se executar
a aplicação através de um servidor local.

### VS Code

Utilize uma extensão como **Live Server** e abra o `index.html`.

### Servidor local com Python

``` bash
python -m http.server 5500
```

Depois acesse:

``` text
http://localhost:5500
```

------------------------------------------------------------------------

## Modelo de permissões

O sistema atualmente trabalha com dois cargos principais:

  -----------------------------------------------------------------------
  Cargo                               Permissões
  ----------------------------------- -----------------------------------
  **Administrador**                   Gerenciamento de usuários,
                                      alteração das próprias credenciais,
                                      gerenciamento geral do sistema

  **Caixa**                           Operações de atendimento e pedidos,
                                      sem gerenciamento de usuários ou
                                      credenciais
  -----------------------------------------------------------------------

A autorização é verificada nas funções responsáveis pelas operações
sensíveis, e não apenas através da visibilidade dos botões na interface.

------------------------------------------------------------------------

## Identidade visual

A interface foi desenvolvida com uma identidade inspirada no universo de
uma padaria/cafeteria:

-   Tons de marrom e café
-   Tons creme e bege
-   Verde utilizado de forma pontual
-   Bordas arredondadas
-   Sombras suaves
-   Interface responsiva
-   Dark Mode com tons quentes
-   Componentes visuais consistentes

A intenção é manter uma interface acolhedora sem abrir mão da clareza
necessária para um sistema administrativo.

------------------------------------------------------------------------

## Qualidade e desenvolvimento

O desenvolvimento segue uma abordagem incremental:

1.  Implementar uma funcionalidade.
2.  Separar responsabilidades em módulos.
3.  Testar o comportamento.
4.  Refinar a interface.
5.  Revisar regras de negócio.
6.  Criar um commit específico.
7.  Avançar para a próxima etapa.

Os commits seguem uma convenção semântica, por exemplo:

``` text
feat(profile): adiciona gerenciamento de credenciais
style(users): ajusta visual dos modais de usuários
fix(cart): corrige cálculo do total
refactor(storage): centraliza persistência local
```

------------------------------------------------------------------------

## Roadmap

### Fase 1 --- Base da aplicação

-   [x] Estrutura inicial
-   [x] Cardápio
-   [x] Categorias
-   [x] Carrinho
-   [x] Persistência local

### Fase 2 --- Autenticação e usuários

-   [x] Login
-   [x] Sessão
-   [x] Perfil
-   [x] Gerenciamento de usuários
-   [x] Permissões
-   [x] Credenciais do administrador
-   [x] Dados pessoais e endereço persistido
-   [x] Validação de e-mail
-   [x] Busca automática de CEP via ViaCEP no cadastro e na edição
-   [x] Refinamento final da área de usuários

### Fase 3 --- Operação da padaria

-   [ ] Gerenciamento de produtos
-   [ ] Fluxo completo de pedidos
-   [x] Histórico
-   [ ] Comandas
-   [ ] Impressão

### Fase 4 --- Gestão

-   [ ] Dashboard
-   [ ] Indicadores
-   [ ] Relatórios
-   [ ] Melhorias de experiência

### Fase 5 --- Backend

-   [ ] API
-   [ ] Banco de dados
-   [ ] Autenticação segura
-   [ ] Hash de senhas
-   [ ] Controle de autorização no servidor
-   [ ] Persistência remota
-   [ ] Deploy

------------------------------------------------------------------------

## Objetivo do projeto

O Padaroca foi desenvolvido como um projeto de estudo e portfólio com o
objetivo de praticar conceitos de desenvolvimento web aplicados a uma
aplicação que possui regras de negócio reais.

O projeto busca demonstrar principalmente:

-   Organização de código
-   JavaScript modular
-   Manipulação do DOM
-   Persistência de dados
-   Autenticação e autorização no front-end
-   Modelagem de dados
-   Regras de negócio
-   Responsividade
-   Design de interface
-   Controle de versão com Git
-   Evolução incremental de uma aplicação

------------------------------------------------------------------------

## Desenvolvimento

Projeto desenvolvido por **Sabrina Santana**.

------------------------------------------------------------------------

## Licença

Este projeto foi desenvolvido para fins de estudo e portfólio.

Caso o projeto seja posteriormente publicado com uma licença específica,
esta seção deverá ser atualizada de acordo com os termos definidos.
