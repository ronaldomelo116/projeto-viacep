# 📬 Consulta de CEP - Projeto de Estudo com API ViaCEP

Uma aplicação web simples, moderna e responsiva desenvolvida para praticar e consolidar conceitos fundamentais de desenvolvimento frontend: manipulação do DOM, eventos, validações com Expressões Regulares (Regex) e **consumo de APIs RESTful assíncronas** utilizando a **Fetch API** do JavaScript.

---

## 📌 Sobre o Projeto

Este projeto consiste em um formulário de consulta de endereços no Brasil. Ao informar um CEP e sair do campo de entrada (evento `blur`), a aplicação consulta os servidores da **ViaCEP**, recupera os dados de logradouro, bairro, cidade e estado, preenchendo automaticamente os campos correspondentes na tela.

O foco principal do desenvolvimento foi entender:
- O ciclo de uma requisição HTTP (`GET`).
- Como lidar com promessas e código assíncrono moderno (`async/await`).
- Como tratar respostas, estados de carregamento e potenciais cenários de erro (CEP inválido, CEP inexistente, falha de rede).
- Estilização com design moderno no estilo *Glassmorphism* (efeito de vidro translúcido).

---

## 🌐 Sobre a API ViaCEP

A [ViaCEP](https://viacep.com.br/) é um web service gratuito de alto desempenho voltado para a consulta de Códigos de Endereçamento Postal (CEP) de todo o território brasileiro.

### Principais características da API:
- **Gratuita e Pública:** Não exige cadastro, chaves de autenticação (API Keys) ou tokens.
- **Formato Simples e Leve:** Suporta retornos em JSON, XML, Piped e Querty. Neste projeto, foi utilizado o formato **JSON**.
- **Alta Disponibilidade:** Uma das APIs mais populares e consolidadas no ecossistema brasileiro para autopreenchimento de cadastros e checkouts de e-commerce.

### Endpoint Utilizado

```http
GET https://viacep.com.br/ws/{CEP}/json/
```

Onde `{CEP}` deve ser substituído por exatamente 8 dígitos numéricos (por exemplo: `01001000`).

### Exemplo de Resposta de Sucesso:

```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

### Tratamento de CEP Inexistente:

Quando um CEP possui formato válido (8 dígitos), mas não consta na base de dados dos Correios, a API responde com status `200 OK` trazendo a chave `"erro"`:

```json
{
  "erro": "true"
}
```

O código do projeto trata essa peculiaridade especificamente verificando `if (data.erro)` para exibir uma mensagem adequada ao usuário.

---

## 🛠️ Como o Projeto Foi Desenvolvido

O projeto foi construído utilizando apenas tecnologias web nativas (**Vanilla**), sem dependência de bibliotecas ou frameworks externos.

### 1. Estrutura HTML (`index.html`)
- **Semântica e Acessibilidade:** Uso de `<label>` vinculados aos respectivos `<input>` através do atributo `for` e `id`.
- **Campos protegidos:** Os campos de Rua, Bairro, Cidade e Estado utilizam o atributo `readonly`, garantindo que apenas a API preencha esses valores.
- **Controle de entrada:** O campo de CEP possui `maxlength="8"` e um `placeholder` com instrução clara de preenchimento.
- **Feedback visual:** Um elemento `<span>` com `id="notice"` reservado para exibir mensagens dinâmicas de status (carregando, sucesso ou erro).

### 2. Estilização CSS (`style.css`)
- **Design Moderno (*Glassmorphism*):** Cartão centralizado com fundo translúcido `rgba(30, 41, 59, 0.85)` e efeito de desfoque de fundo com `backdrop-filter: blur(10px)`.
- **CSS Variables:** Definição de paleta de cores centralizada no `:root` facilitando manutenção visual.
- **Layout Centralizado:** Uso de `display: flex` no `body` para centralizar perfeitamente o formulário na tela sobre uma imagem de fundo com overlay em gradiente.
- **Responsividade:** Uso de `@media (max-width: 420px)` ajustando espaçamentos e tamanhos de fonte para uma visualização confortável em smartphones.

### 3. Lógica JavaScript (`script.js`)
- **Disparo pelo Evento `blur`:** A consulta é disparada assim que o usuário digita o CEP e clica ou navega para outro campo, evitando requisições desnecessárias a cada tecla digitada.
- **Sanitização com Regex:** `zipCode.value.replace(/\D/g, '')` remove quaisquer caracteres não numéricos (como pontos, hífens ou letras).
- **Validação Prévia:** Verifica se a string resultante possui exatamente 8 dígitos antes de iniciar qualquer chamada de rede.
- **Consumo Assíncrono (`async/await` + `fetch`):**
  - Exibição de mensagem informativa de carregamento (`"Buscando endereço..."`).
  - Chamada HTTP para a URL da ViaCEP.
  - Conversão da resposta com `response.json()`.
- **Tratamento de Exceções (`try / catch`):** Captura falhas de conexão com o servidor ou problemas de rede.
- **Função Utilitária `clearForm()`:** Limpa os campos de endereço caso o CEP consultado seja inválido ou não encontrado.

---

## 📂 Estrutura de Arquivos

```text
projeto-viacep/
├── assets/
│   └── img/
│       ├── background.webp     # Imagem de fundo da página
│       └── favicon.png         # Ícone da aba do navegador
├── index.html                  # Estrutura do formulário
├── script.js                   # Lógica assíncrona e consumo da API
├── style.css                   # Estilos e responsividade
└── README.md                   # Documentação do projeto
```

---

## 🚀 Como Executar o Projeto

Como o projeto é estático (HTML, CSS e JS puros), você não precisa de nenhum gerenciador de pacotes ou servidor complexo:

1. Clone ou baixe este repositório para o seu computador.
2. Abra o arquivo `index.html` diretamente em qualquer navegador web (Google Chrome, Firefox, Edge, etc.).
3. *(Opcional)* Se estiver utilizando o **VS Code**, utilize a extensão **Live Server** para recarregamento automático durante as alterações.

---

## 💡 Próximos Passos e Melhorias Futuras

Ideias para expandir este projeto de estudos:
- [ ] Aplicar máscara de CEP dinâmica enquanto o usuário digita (ex: `00000-000`).
- [ ] Adicionar campos de número predial e complemento para um formulário de cadastro completo.
- [ ] Adicionar um ícone de spinner / animação durante o estado de carregamento.
- [ ] Integrar salvamento de endereços pesquisados no `localStorage`.

---

## 📄 Desenvolvedor 

Ronaldo Melo!
