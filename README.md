# Padaroca

> Sistema web de gerenciamento para uma padaria, desenvolvido como projeto de portfólio com JavaScript puro.

O **Padaroca** é uma aplicação web desenvolvida para simular a rotina de atendimento e gerenciamento de uma padaria.

O projeto reúne funcionalidades de **cardápio, carrinho, pedidos, histórico, impressão de comandas, gerenciamento de produtos, usuários, autenticação e controle de permissões**, utilizando uma arquitetura modular no front-end.

A aplicação está sendo construída de forma incremental, com foco em **organização de código, separação de responsabilidades, regras de negócio, experiência do usuário e evolução gradual da arquitetura**, preparando o sistema para uma futura integração com backend.

---

## Status do projeto

**Em desenvolvimento — Front-end**

O Padaroca possui atualmente uma base funcional consolidada no front-end.

As principais funcionalidades de operação da padaria já foram implementadas e validadas. O projeto entra agora em sua próxima etapa de evolução: **Gestão**, começando pelo desenvolvimento do Dashboard.

### Progresso atual

- [x] Estrutura inicial da aplicação
- [x] Cardápio e categorias
- [x] Carrinho
- [x] Persistência local
- [x] Sistema de autenticação
- [x] Sessão do usuário
- [x] Perfil do usuário
- [x] Gerenciamento de usuários
- [x] Controle de permissões por cargo
- [x] Credenciais do administrador
- [x] Validação de e-mail
- [x] Busca automática de CEP via ViaCEP
- [x] Dark Mode
- [x] Modularização do JavaScript
- [x] Refinamento da área de usuários
- [x] Gerenciamento de produtos
- [x] Cadastro de produtos
- [x] Edição de produtos
- [x] Exclusão de produtos
- [x] Ativação e desativação de produtos
- [x] Fluxo completo de pedidos
- [x] Histórico de pedidos
- [x] Comandas
- [x] Impressão de pedidos
- [ ] Dashboard
- [ ] Indicadores
- [ ] Relatórios
- [ ] Melhorias de experiência
- [ ] Backend e banco de dados
- [ ] Deploy

---

# Funcionalidades

## Cardápio

O sistema possui um cardápio organizado por categorias, permitindo localizar e adicionar produtos ao pedido.

### Recursos

- Organização dos produtos por categorias
- Busca de produtos
- Filtros por categoria
- Cards de produtos
- Adição de produtos ao carrinho
- Exibição de produtos ativos
- Integração com o gerenciamento de produtos

### Categorias utilizadas atualmente

- Cafés
- Pães
- Tapiocas
- Cuscuz
- Crepiocas
- Doces e Salgados
- Bebidas

---

## Carrinho

O carrinho concentra os produtos selecionados durante o atendimento.

### Recursos

- Adição de produtos
- Remoção de produtos
- Controle de quantidade
- Cálculo automático de subtotais
- Cálculo do total do pedido
- Identificação do cliente
- Observação do pedido
- Persistência do carrinho
- Limpeza do carrinho após finalização

---

## Pedidos

O Padaroca possui um fluxo completo para criação e finalização de pedidos.

### Recursos

- Identificação do cliente
- Número do pedido
- Registro de data e horário
- Observações
- Listagem dos produtos
- Quantidades
- Subtotais
- Total do pedido
- Finalização do pedido
- Envio do pedido para WhatsApp
- Limpeza automática após finalização

---

## Histórico de pedidos

Os pedidos finalizados ficam disponíveis no histórico da aplicação.

### Recursos

- Listagem dos pedidos realizados
- Identificação do pedido
- Visualização dos detalhes
- Informações do cliente
- Produtos e quantidades
- Total do pedido
- Exclusão de pedidos
- Persistência dos registros

---

## Comandas e impressão

O sistema possui uma estrutura própria para geração e impressão de comandas.

A impressão utiliza os dados do pedido atual e gera uma versão formatada para impressão.

### Informações da comanda

- Nome da padaria
- Número do pedido
- Data e horário
- Cliente
- Produtos
- Quantidades
- Valores
- Observação
- Total

---

## Gerenciamento de produtos

O administrador possui uma área dedicada ao gerenciamento do catálogo de produtos.

### Recursos

- Cadastro de produtos
- Edição de produtos
- Exclusão de produtos
- Ativação de produtos
- Desativação de produtos
- Definição de categoria
- Definição de preço
- Descrição do produto
- Imagem do produto
- Atualização persistente dos dados

O gerenciamento utiliza uma camada de serviço própria para centralizar as operações relacionadas aos produtos.

---

## Autenticação

O sistema possui autenticação no front-end para controlar o acesso à aplicação.

### Recursos

- Login
- Sessão do usuário
- Identificação do usuário atual
- Logout
- Redirecionamento de usuários não autenticados
- Controle de acesso baseado em cargo

---

## Perfil

Cada usuário possui uma área de perfil para gerenciamento de seus dados.

### Recursos

- Visualização dos dados pessoais
- Edição dos dados
- Endereço
- Número
- CEP
- Bairro
- Cidade

O administrador possui recursos adicionais relacionados às próprias credenciais.

### Credenciais do administrador

- Alteração do nome de usuário
- Alteração da senha
- Alteração independente do usuário e da senha
- Validação mínima de senha
- Bloqueio de nomes de usuário duplicados

Por segurança dentro do fluxo atual, a senha existente nunca é carregada no formulário de edição.

---

## Gerenciamento de usuários

O administrador possui uma área específica para gerenciamento dos usuários do sistema.

### Recursos

- Criar usuários
- Editar usuários
- Alterar cargo
- Alterar nome de usuário
- Alterar senha
- Alterar dados pessoais
- Alterar endereço
- Ativar usuários
- Desativar usuários
- Excluir usuários

### Regras implementadas

- Apenas administradores podem acessar o gerenciamento de usuários.
- O administrador não pode editar a própria conta pela área de usuários.
- O administrador não pode desativar a própria conta.
- O administrador não pode excluir a própria conta.
- Nomes de usuário duplicados são bloqueados.
- E-mails são validados no cadastro e na edição.
- A busca automática de CEP via ViaCEP está disponível no cadastro e na edição.
- Usuários comuns não podem alterar suas próprias credenciais.
- A própria conta do administrador é gerenciada pela área **Meu Perfil**.

---

## Tema

A interface possui suporte a temas claro e escuro.

### Recursos

- Light Mode
- Dark Mode
- Persistência da preferência do usuário
- Identidade visual adaptada para os dois temas

---

# Tecnologias

O projeto utiliza tecnologias nativas da web:

- **HTML5**
- **CSS3**
- **JavaScript**
- **JavaScript ES Modules**
- **LocalStorage**
- **Git**
- **GitHub**
- **ViaCEP**

Não há framework JavaScript obrigatório na camada atual do projeto.

A aplicação utiliza **ES Modules** para separar responsabilidades e evitar a concentração de toda a lógica em um único arquivo.

---

# Estrutura do projeto

A estrutura atual segue uma organização modular:

```text
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
│   ├── orders.js
│   ├── print.js
│   ├── productService.js
│   ├── products.js
│   ├── productsManagement.js
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

> A estrutura pode evoluir conforme novas funcionalidades forem incorporadas ao projeto.

---

# Arquitetura JavaScript

O JavaScript foi dividido em módulos com responsabilidades específicas.

### `auth.js`

Responsável pela autenticação, sessão e gerenciamento do usuário atualmente logado.

### `storage.js`

Centraliza as operações de persistência utilizando `localStorage`.

### `selectors.js`

Centraliza os elementos do DOM utilizados pelos diferentes módulos da aplicação.

### `cart.js`

Concentra a lógica relacionada ao carrinho, incluindo produtos, quantidades, totais e persistência.

### `filters.js`

Gerencia a busca, os filtros e a exibição das categorias do cardápio.

### `users.js`

Responsável pelo gerenciamento de usuários, cargos, status, criação, edição e exclusão.

### `profile.js`

Gerencia o perfil do usuário, seus dados pessoais, endereço e credenciais do administrador.

### `products.js`

Responsável pela renderização dos produtos no cardápio e integração dos produtos com a interface.

### `productService.js`

Centraliza as operações relacionadas aos produtos, incluindo:

- Consulta
- Cadastro
- Atualização
- Exclusão
- Ativação e desativação

### `productsManagement.js`

Controla a interface de gerenciamento de produtos e integra as ações administrativas ao serviço de produtos.

### `orders.js`

Concentra a lógica de criação, finalização, persistência, histórico e visualização dos pedidos.

### `print.js`

Responsável pela geração e impressão das comandas.

### `theme.js`

Gerencia a preferência de tema da aplicação.

### `utils.js`

Reúne funções auxiliares reutilizáveis, como tratamento e formatação de valores.

### `icons.js`

Centraliza os ícones utilizados pela interface.

### `script.js`

Atua como ponto de inicialização e integração dos principais módulos da aplicação.

---

# Persistência atual

Enquanto o backend ainda não foi implementado, os dados são armazenados no navegador utilizando `localStorage`.

Algumas das chaves utilizadas atualmente incluem:

```text
padaroca-users
padaroca-current-user
padaroca-theme
padaroca-cart
padaroca-products
padaroca-orders
padaroca-order-number
```

Essa abordagem permite desenvolver e testar os fluxos completos da aplicação no front-end antes da implementação de uma API e de um banco de dados.

## Atenção

A persistência atual é destinada a **protótipo e desenvolvimento**.

As credenciais ainda são armazenadas no `localStorage`. Portanto, esta versão **não deve ser utilizada como sistema de produção**.

Na futura implementação do backend, a autenticação deverá ser transferida para uma arquitetura segura, com:

- Armazenamento adequado de senhas
- Hash de senhas
- Sessões ou tokens seguros
- Controle de autorização no servidor
- Persistência remota

---

# Como executar

Como o projeto utiliza JavaScript com módulos ES, recomenda-se executar a aplicação através de um servidor local.

## VS Code

Utilize uma extensão como **Live Server** e abra o projeto através do servidor local.

## Servidor local com Python

```bash
python -m http.server 5500
```

Depois acesse:

```text
http://localhost:5500
```

---

# Modelo de permissões

O sistema atualmente trabalha com dois cargos principais:

| Cargo             | Permissões                                                                        |
| ----------------- | --------------------------------------------------------------------------------- |
| **Administrador** | Gerenciamento de usuários, credenciais, produtos e gerenciamento geral do sistema |
| **Caixa**         | Operações de atendimento e pedidos, sem acesso ao gerenciamento administrativo    |

A autorização das operações sensíveis é verificada na lógica responsável pela operação, e não somente através da visibilidade dos botões na interface.

---

# Identidade visual

A interface foi desenvolvida com uma identidade inspirada no universo de uma padaria/cafeteria.

### Características

- Tons de marrom e café
- Tons creme e bege
- Verde utilizado de forma pontual
- Bordas arredondadas
- Sombras suaves
- Interface responsiva
- Dark Mode com tons quentes
- Componentes visuais consistentes

A proposta é manter uma interface acolhedora sem abrir mão da clareza necessária para um sistema administrativo.

---

# Qualidade e desenvolvimento

O desenvolvimento segue uma abordagem incremental:

1. Implementar uma funcionalidade.
2. Separar responsabilidades em módulos.
3. Testar o comportamento.
4. Refinar a interface.
5. Revisar regras de negócio.
6. Criar um commit específico.
7. Avançar para a próxima etapa.

A intenção é manter o projeto evoluindo de maneira controlada, evitando concentrar grandes quantidades de lógica em um único arquivo.

### Convenção de commits

Os commits seguem uma convenção semântica, por exemplo:

```text
feat(profile): adiciona gerenciamento de credenciais

style(users): ajusta visual dos modais de usuários

fix(cart): corrige cálculo do total

refactor(storage): centraliza persistência local
```

---

# Roadmap

## Fase 1 — Base da aplicação

- [x] Estrutura inicial
- [x] Cardápio
- [x] Categorias
- [x] Carrinho
- [x] Persistência local

## Fase 2 — Autenticação e usuários

- [x] Login
- [x] Sessão
- [x] Perfil
- [x] Gerenciamento de usuários
- [x] Permissões
- [x] Credenciais do administrador
- [x] Dados pessoais e endereço persistido
- [x] Validação de e-mail
- [x] Busca automática de CEP via ViaCEP
- [x] Refinamento final da área de usuários

## Fase 3 — Operação da padaria

- [x] Gerenciamento de produtos
- [x] Cadastro, edição e exclusão de produtos
- [x] Ativação e desativação de produtos
- [x] Fluxo completo de pedidos
- [x] Histórico
- [x] Comandas
- [x] Impressão

## Fase 4 — Gestão

- [ ] Dashboard
- [ ] Indicadores
- [ ] Relatórios
- [ ] Melhorias de experiência

**Próxima etapa: Dashboard.**

## Fase 5 — Backend

- [ ] API
- [ ] Banco de dados
- [ ] Autenticação segura
- [ ] Hash de senhas
- [ ] Controle de autorização no servidor
- [ ] Persistência remota
- [ ] Deploy

---

# Objetivo do projeto

O Padaroca foi desenvolvido como um projeto de **estudo e portfólio**, com o objetivo de praticar conceitos de desenvolvimento web aplicados a uma aplicação com regras de negócio reais.

O projeto busca demonstrar principalmente:

- Organização de código
- JavaScript modular
- ES Modules
- Manipulação do DOM
- Persistência de dados
- Autenticação
- Autorização
- Modelagem de dados
- Regras de negócio
- Responsividade
- Design de interface
- Controle de versão com Git
- Evolução incremental de uma aplicação

Além de demonstrar conhecimento técnico, o projeto busca reproduzir uma aplicação próxima de um cenário real de uso, permitindo evoluir futuramente de um front-end baseado em armazenamento local para uma arquitetura completa com backend.

---

# Desenvolvimento

Projeto desenvolvido por **Sabrina Santana**.

---

# Licença

Este projeto foi desenvolvido para fins de **estudo e portfólio**.

Caso o projeto seja posteriormente publicado com uma licença específica, esta seção deverá ser atualizada de acordo com os termos definidos.
