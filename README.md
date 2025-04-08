# 🍔 Sistema de Pedidos Online - Lanchonete do Bairro

Este projeto foi desenvolvido como um **freelancer** para uma lanchonete local, com o objetivo de facilitar a realização de pedidos online pelos clientes, integrando um carrinho de compras simples e direto com o **WhatsApp** da empresa.

---

## 🔧 Tecnologias Utilizadas

- **HTML5** e **CSS3**: Estrutura e estilo da página
- **JavaScript Vanilla (puro)**: Lógica de carrinho, formulário, cupom de desconto e integração
- **API do WhatsApp**: Envio automático de pedidos com dados formatados via *Click-to-Chat*

---

## ✨ Funcionalidades

- 🛒 Adicionar e remover produtos do carrinho  
- 🧾 Cálculo de total automático (com suporte a **cupom de desconto**)  
- 💬 Envio do pedido diretamente via **WhatsApp** com:
  - Nome, telefone e endereço do cliente
  - Forma de pagamento selecionada
  - Lista de itens, quantidade e total (com ou sem desconto)
- ⏰ Exibição de status *Aberto/Fechado* com base no horário atual (dinâmico)

---

## 💡 Integração com API do WhatsApp

Este projeto utiliza a **API pública do WhatsApp (Click-to-Chat)** para gerar links dinâmicos contendo o resumo do pedido, enviados diretamente ao número da lanchonete.  
Exemplo de uso:

```´js window.open(`https://api.whatsapp.com/send?phone=...&text=${mensagem}`, "_blank");
🖼️ Preview
Adicione uma imagem aqui se quiser ilustrar o sistema funcionando
Exemplo:

📦 Como usar
Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/seuusuario/pedidos-lanchonete.git
Abra o arquivo index.html no navegador.

Personalize os dados de produtos, número do WhatsApp e mensagens se necessário.

📲 Exemplo de Pedido Enviado
yaml
Copiar
Editar
RESUMO DO PEDIDO:
Nome: João Silva
Telefone: 21999999999
Endereço: Rua Exemplo, 123
Forma de pagamento: PIX
Cupom: DESCONTO10 (10% de desconto aplicado)

- X-Burguer R$12,00 (Qtd: 2)
- Coca-Cola 350ml R$5,00 (Qtd: 1)

Subtotal: R$29,00  
Desconto (10%): -R$2,90  
Total com desconto: R$26,10
🤝 Projeto Freelancer
Este projeto foi feito como um freelancer para a Lanchonete do Bairro, com foco em simplicidade, leveza e funcionalidade direta.
Ideal para comércios locais que ainda não utilizam plataformas de pedidos online.

📌 Melhorias Futuras
Armazenamento dos dados no localStorage

Backend com banco de dados para histórico de pedidos

Painel de administração para gerenciar produtos e pedidos

📬 Contato
Fique à vontade para me chamar:

LinkedIn: https://www.linkedin.com/in/gabriel-alexandre-silva/

Email: gabrielalexok@gmail.com
