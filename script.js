// Adicionar botão de seta para retornar ao topo após 3 scrolls
document.addEventListener("DOMContentLoaded", () => {
	// Criar o botão de seta
	const scrollTopButton = document.createElement("div");
	scrollTopButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-arrow-90deg-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z"/>
</svg>`;
	scrollTopButton.id = "scroll-to-top";
	scrollTopButton.style.position = "fixed";
	scrollTopButton.style.right = "20px";
	scrollTopButton.style.bottom = "30px";
	scrollTopButton.style.width = "50px";
	scrollTopButton.style.height = "50px";
	scrollTopButton.style.backgroundColor = "red";
	scrollTopButton.style.color = "white";
	scrollTopButton.style.borderRadius = "50%";
	scrollTopButton.style.display = "flex";
	scrollTopButton.style.justifyContent = "center";
	scrollTopButton.style.alignItems = "center";
	scrollTopButton.style.fontSize = "30px";
	scrollTopButton.style.fontWeight = "900";
	scrollTopButton.style.cursor = "pointer";
	scrollTopButton.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";
	scrollTopButton.style.opacity = "0";
	scrollTopButton.style.transition = "opacity 0.5s ease";
	scrollTopButton.style.zIndex = "1000";

	// Adicionar ao body
	document.body.appendChild(scrollTopButton);

	// Contador de scroll
	let scrollCount = 0;

	// Monitorar eventos de scroll
	window.addEventListener("scroll", () => {
		// Incrementar contador apenas quando o scroll for significativo
		if (window.scrollY > 300 && scrollCount < 3) {
			scrollCount++;
		}

		// Mostrar o botão após 3 scrolls
		if (scrollCount >= 3) {
			scrollTopButton.style.opacity = "1";
		} else {
			scrollTopButton.style.opacity = "0";
		}

		// Ocultar botão quando estiver no topo
		if (window.scrollY < 100) {
			scrollTopButton.style.opacity = "0";
		}
	});

	// Adicionar evento de clique para rolar para o topo
	scrollTopButton.addEventListener("click", () => {
		// Rolar suavemente para o topo
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});
});

const cart = []; // Tornar global

// Definir o cupom de desconto válido
const validCoupon = "DESCONTO10";
const discountPercentage = 10; // 10% de desconto

// Carrinho
document.addEventListener("DOMContentLoaded", () => {
	const cartBtn = document.getElementById("cart-btn");
	const cartContainer = document.getElementById("cart-container");
	const closeCartBtn = document.getElementById("close-cart");
	const cartItemsContainer = document.querySelector(".cart-items");
	const cartTotal = document.getElementById("cart-total");
	const cartCount = document.getElementById("cart-count");
	const addToCartButtons = document.querySelectorAll(".add-to-cart");

	// Garantir que o carrinho comece oculto
	cartContainer.style.display = "none";
	cartContainer.style.position = "fixed";
	cartContainer.style.top = "0";
	cartContainer.style.right = "0";
	cartContainer.style.width = "350px";
	cartContainer.style.height = "100vh";
	cartContainer.style.backgroundColor = "#fff";
	cartContainer.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
	cartContainer.style.padding = "20px";
	cartContainer.style.overflowY = "auto";
	cartContainer.style.transition = "0.3s ease-in-out";
	cartContainer.style.borderLeft = "4px solid red";

	// Botão de fechar
	closeCartBtn.style.position = "absolute";
	closeCartBtn.style.top = "10px";
	closeCartBtn.style.right = "10px";
	closeCartBtn.style.fontSize = "20px";
	closeCartBtn.style.cursor = "pointer";
	closeCartBtn.style.border = "none";
	closeCartBtn.style.background = "none";
	closeCartBtn.style.color = "red";

	cartBtn.addEventListener("click", () => {
		const agora = new Date();
		const hora = agora.getHours();

		// Verificação do carrinho real
		const carrinhoVazio = cart.length === 0;

		// Verifica se está fora do horário de funcionamento (das 2h às 18h)
		if (hora >= 2 && hora < 18) {
			Swal.fire({
				title: "Loja Fechada!",
				text: "Abriremos a partir das 18h.",
				icon: "error",
				confirmButtonText: "Ok",
			});
			return;
		}

		// Se o carrinho estiver vazio e for depois das 18h ou antes das 2h (horário de funcionamento)
		if (carrinhoVazio) {
			Swal.fire({
				title: "Seu carrinho está vazio!",
				text: "Volte e escolha um pedido.",
				icon: "error",
				confirmButtonText: "Ok",
			});
			return;
		}

		// Se estiver dentro do horário e o carrinho tiver itens, mostrar o carrinho
		cartContainer.style.display =
			cartContainer.style.display === "none" ||
			cartContainer.style.display === ""
				? "flex"
				: "none";
	});

	// Fechar carrinho ao clicar no botão de fechar
	closeCartBtn.addEventListener("click", () => {
		cartContainer.style.display = "none";
	});

	// Adicionar item ao carrinho
	// Adicionar item ao carrinho
	addToCartButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const item = this.closest(".item");
			const name = item.getAttribute("data-name");
			const price = Number.parseFloat(item.getAttribute("data-price"));
			const image = item.querySelector("img").src;

			const existingItem = cart.find((i) => i.name === name);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				cart.push({ name, price, quantity: 1, image });
			}

			updateCart();

			// Adicionar mensagem de confirmação
			Swal.fire({
				title: "Produto adicionado!",
				text: `${name} foi adicionado ao seu carrinho`,
				icon: "success",
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 2000,
				timerProgressBar: true,
			});
		});
	});
	// Atualizar carrinho com a barra e o formulário
	const updateCart = () => {
		cartItemsContainer.innerHTML = "";
		let total = 0;
		let count = 0;

		// Criar container principal para os itens e o formulário
		const cartWrapper = document.createElement("div");
		cartWrapper.style.display = "flex";
		cartWrapper.style.flexDirection = "column";
		cartWrapper.style.gap = "15px";

		// Criar a lista de itens do carrinho
		const cartItemsDiv = document.createElement("div");
		cartItemsDiv.style.display = "flex";
		cartItemsDiv.style.flexDirection = "column";
		cartItemsDiv.style.gap = "10px";

		cart.forEach((item, index) => {
			const li = document.createElement("div");
			li.style.display = "flex";
			li.style.alignItems = "center";
			li.style.justifyContent = "space-between";
			li.style.padding = "10px";
			li.style.borderBottom = "1px solid #ddd";
			li.style.borderRadius = "5px";

			li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 5px;">
                <div style="flex: 1; margin-left: 10px;">
                    <strong>${item.name}</strong> - R$${item.price.toFixed(2)} (Qtd: ${item.quantity})<br>
                    <em>Total: R$${(item.price * item.quantity).toFixed(2)}</em>
                </div>
                <button class="remove-item" data-index="${index}" style="border: none; background: none; color: red; cursor: pointer; font-size: 20px;">−</button>
            `;
			cartItemsDiv.appendChild(li);
			total += item.price * item.quantity;
			count += item.quantity;
		});

		// Criar a barra vertical vermelha
		const divider = document.createElement("div");
		divider.style.width = "100%";
		divider.style.height = "3px";
		divider.style.backgroundColor = "red";
		divider.style.borderRadius = "5px";
		divider.style.margin = "10px 0";

		// Criar o formulário de checkout
		const checkoutForm = document.createElement("div");
		checkoutForm.style.display = "flex";
		checkoutForm.style.flexDirection = "column";
		checkoutForm.style.gap = "10px";
		checkoutForm.innerHTML = `
            <h3 style="text-align: center; color: #333;">Finalizar Pedido</h3>
            <input type="text" id="nome" placeholder="Digite seu nome" style="padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
            <input type="tel" id="telefone" placeholder="Digite seu telefone" style="padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
            <input type="text" id="endereco" placeholder="Digite seu endereço" style="padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
            <select id="pagamento" style="padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao">Cartão</option>
                <option value="pix">PIX</option>
            </select>
            <input type="text" id="input-cupom" placeholder="Digite seu cupom" style="padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
            <div id="cupom-message" style="font-size: 14px; margin-top: 5px;"></div>
            <button id="checkout-btn" style="background-color: red; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer; margin-top: 15px; width: 100%; font-weight: bold;">Finalizar Pedido</button>
        `;

		// Adicionar os elementos no contêiner principal
		cartWrapper.appendChild(cartItemsDiv);
		cartWrapper.appendChild(divider);
		cartWrapper.appendChild(checkoutForm);

		// Substituir o conteúdo do carrinho
		cartItemsContainer.appendChild(cartWrapper);

		cartTotal.textContent = total.toFixed(2);
		cartCount.textContent = count;

		// Adicionar eventos de remoção
		document.querySelectorAll(".remove-item").forEach((button) => {
			button.addEventListener("click", function () {
				const index = Number.parseInt(this.getAttribute("data-index"));
				cart.splice(index, 1);
				updateCart();
			});
		});

		// Adicionar evento ao botão de finalizar pedido
		const checkoutBtn = document.getElementById("checkout-btn");
		if (checkoutBtn) {
			checkoutBtn.addEventListener("click", enviarPedido);
		}

		// Adicionar evento ao input de cupom
		const cupomInput = document.getElementById("input-cupom");
		if (cupomInput) {
			cupomInput.addEventListener("input", () => {
				aplicarCupom();
			});
		}
	};
});

// Função para aplicar o cupom de desconto
const aplicarCupom = () => {
	const cupomInput = document.getElementById("input-cupom");
	if (!cupomInput) return false;

	const cupomValue = cupomInput.value.trim().toUpperCase();

	// Encontrar elemento para mostrar mensagens sobre o cupom
	let cupomMessage = document.getElementById("cupom-message");
	if (!cupomMessage) {
		cupomMessage = document.createElement("div");
		cupomMessage.id = "cupom-message";
		cupomMessage.style.fontSize = "14px";
		cupomMessage.style.marginTop = "5px";
		cupomMessage.style.fontWeight = "bold";
		cupomInput.parentNode.insertBefore(cupomMessage, cupomInput.nextSibling);
	}

	// Verificar se o cupom é válido
	if (cupomValue === validCoupon) {
		cupomMessage.textContent = "Cupom DESCONTO10 aplicado! 10% de desconto";
		cupomMessage.style.color = "green";

		// Exibir o total com desconto no carrinho
		exibirDescontoNoCarrinho();

		return true;
	} else if (cupomValue !== "") {
		cupomMessage.textContent = "Cupom inválido";
		cupomMessage.style.color = "red";

		// Remover informações de desconto se houver
		const discountInfoElement = document.getElementById("discount-info");
		if (discountInfoElement) {
			discountInfoElement.remove();
		}
	} else {
		cupomMessage.textContent = "";

		// Remover informações de desconto se houver
		const discountInfoElement = document.getElementById("discount-info");
		if (discountInfoElement) {
			discountInfoElement.remove();
		}
	}

	return false;
};

// Função para exibir desconto no carrinho
const exibirDescontoNoCarrinho = () => {
	const cartTotal = document.getElementById("cart-total");

	if (!cartTotal) return;

	const currentTotal = Number.parseFloat(cartTotal.textContent);
	const discountAmount = currentTotal * (discountPercentage / 100);
	const discountedTotal = currentTotal - discountAmount;

	// Atualizar ou criar elemento para mostrar informações do desconto
	let discountInfoElement = document.getElementById("discount-info");
	if (!discountInfoElement) {
		discountInfoElement = document.createElement("div");
		discountInfoElement.id = "discount-info";
		discountInfoElement.style.marginTop = "10px";
		discountInfoElement.style.color = "green";
		discountInfoElement.style.fontWeight = "bold";
		cartTotal.parentNode.appendChild(discountInfoElement);
	}

	discountInfoElement.innerHTML = `
        <div>Subtotal: R$ ${currentTotal.toFixed(2)}</div>
        <div>Desconto (${discountPercentage}%): -R$ ${discountAmount.toFixed(2)}</div>
        <div>Total com desconto: R$ ${discountedTotal.toFixed(2)}</div>
    `;
};

// Função de validação
const validarFormulario = () => {
	const nome = document.getElementById("nome").value.trim();
	const telefone = document.getElementById("telefone").value.trim();
	const endereco = document.getElementById("endereco").value.trim();

	// Garantir que o contêiner de erro esteja dentro do carrinho
	const cartContainer = document.getElementById("cart-container"); // Certifique-se de que o contêiner do carrinho tenha este ID
	let errorContainer = document.getElementById("error-container");

	if (!errorContainer) {
		errorContainer = document.createElement("div");
		errorContainer.id = "error-container";
		errorContainer.style.color = "red"; // Cor para as mensagens de erro
		errorContainer.style.marginTop = "10px";
		cartContainer.appendChild(errorContainer); // Adiciona as mensagens ao carrinho
	}

	// Limpar as mensagens de erro anteriores
	errorContainer.innerHTML = "";

	// Verifica se os campos não estão vazios
	if (nome === "" || telefone === "" || endereco === "") {
		const mensagem = document.createElement("p");
		mensagem.innerHTML = "Por favor, preencha Nome, Telefone e Endereço!";
		errorContainer.appendChild(mensagem);
		return false;
	}

	// Verificar se o telefone é válido (exemplo simples)
	const telefoneRegex = /^[0-9]{11}$/; // Formato de telefone brasileiro sem espaços ou caracteres especiais
	if (!telefoneRegex.test(telefone)) {
		const mensagem = document.createElement("p");
		mensagem.innerHTML = "Por favor, insira um número válido!";
		errorContainer.appendChild(mensagem);
		return false;
	}

	// Se passou em todas as validações
	return true;
};

// Função para enviar o pedido
const enviarPedido = () => {
	// Valida o formulário antes de continuar
	if (!validarFormulario()) {
		return; // Não faz nada se o formulário não for válido
	}

	// Coletando as informações do formulário
	const nome = document.getElementById("nome").value.trim();
	const telefone = document.getElementById("telefone").value.trim();
	const endereco = document.getElementById("endereco").value.trim();
	const pagamento = document.getElementById("pagamento").value;

	const cupomInput = document.getElementById("input-cupom");
	const cupom = cupomInput ? cupomInput.value.trim().toUpperCase() : "";

	// Número do WhatsApp
	const numeroWhatsApp = "5521969720690"; // Número do WhatsApp do restaurante

	// Mensagem inicial com os dados do cliente
	let mensagem = `  RESUMO DO PEDIDO:\n`;
	mensagem += `Nome do cliente : ${nome}\n`;
	mensagem += `Telefone : ${telefone}\n`;
	mensagem += `Endereço : ${endereco}\n`;
	mensagem += `Forma de pagamento : ${pagamento}\n`;

	// Verifica se há cupom aplicado
	const cupomValido = cupom === validCoupon;
	if (cupom) {
		mensagem += `Cupom: ${cupom}${cupomValido ? " (10% de desconto aplicado)" : " (inválido)"}\n`;
	}

	// Adicionar os itens do carrinho à mensagem
	cart.forEach((produto) => {
		mensagem += `- ${produto.name} R$${produto.price.toFixed(2)} (Qtd: ${produto.quantity})\n`;
	});

	// Total do pedido
	const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

	// Aplicar desconto se o cupom for válido
	if (cupomValido) {
		const valorDesconto = total * (discountPercentage / 100);
		const totalComDesconto = total - valorDesconto;

		mensagem += `\nSubtotal: R$ ${total.toFixed(2)}`;
		mensagem += `\nDesconto (${discountPercentage}%): -R$ ${valorDesconto.toFixed(2)}`;
		mensagem += `\nTotal com desconto: R$ ${totalComDesconto.toFixed(2)}`;
	} else {
		mensagem += `\nTotal: R$ ${total.toFixed(2)}`;
	}

	// Criar o link para o WhatsApp
	const link = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;

	// Abrir o WhatsApp com a mensagem pré-preenchida
	window.open(link, "_blank");
};

// Status de aberto ou fechado (separado do carrinho)
document.addEventListener("DOMContentLoaded", () => {
	const statusDiv = document.querySelector(".status");

	const atualizarStatus = () => {
		const agora = new Date();
		const hora = agora.getHours();

		statusDiv.style.padding = "8px";
		statusDiv.style.borderRadius = "5px";
		statusDiv.style.textAlign = "center";
		statusDiv.style.color = "white";
		statusDiv.style.fontWeight = "bold";

		if (hora >= 18 || hora < 2) {
			// Corrigido para funcionar corretamente
			statusDiv.innerHTML = "🟢 Aberto";
			statusDiv.style.backgroundColor = "#21BA45";
			statusDiv.style.borderRadius = "20px";
			statusDiv.style.padding = "2px 20px";
			statusDiv.style.fontWeight = "600";
			statusDiv.style.width = "130px";
			statusDiv.style.position = "absolute";
			statusDiv.style.left = "46%";
			statusDiv.style.marginTop = "30px";
		} else {
			statusDiv.innerHTML = "⌛ Fechado";
			statusDiv.style.backgroundColor = "#d60000"; // Vermelho
			statusDiv.classList.add("fechado");
			statusDiv.style.borderRadius = "20px";
			statusDiv.style.padding = "2px 19px";
			statusDiv.style.fontWeight = "600";
			statusDiv.style.width = "130px";
			statusDiv.style.position = "absolute";
			statusDiv.style.left = "46%";
		}
	};

	atualizarStatus();
	setInterval(atualizarStatus, 60000); // Atualiza a cada minuto
});
