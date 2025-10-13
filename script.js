let cart = []; // Array para armazenar os itens do carrinho

const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalValue = document.getElementById('cart-total-value');
const cartIcon = document.getElementById('cart-icon');
const closeCartButton = document.getElementById('close-cart');
// Seleciona todos os botões "Comprar" nos cards
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn'); 

// Função que adiciona o produto ao carrinho
function addToCart(event) {
    // Busca o elemento pai (o card do produto) que contém os dados
    const card = event.target.closest('.product-card');

    // Extrai os dados dos atributos data- do HTML
    const productId = parseInt(card.dataset.id);
    const productName = card.dataset.name;
    // Converte a string de preço para um número decimal
    const productPrice = parseFloat(card.dataset.price);

    // Cria o objeto produto
    const product = { 
        id: productId, 
        name: productName, 
        price: productPrice 
    };

    // Verifica se o item já está no carrinho
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1; // Se existe, aumenta a quantidade
    } else {
        cart.push({ ...product, quantity: 1 }); // Se não existe, adiciona novo item
    }
    
    updateCartDisplay();
    // Você pode substituir o alert por uma notificação mais estilizada!
    alert(`"${product.name}" adicionado ao seu carrinho.`);
}

// Função que atualiza a contagem e a lista dentro do modal
function updateCartDisplay() {
    // 1. Atualiza a contagem no ícone do carrinho
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Seu carrinho está vazio.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            // Cria o elemento para cada item no carrinho
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name} (${item.quantity}x)</span>
                <span>R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // 2. Atualiza o valor total
    cartTotalValue.textContent = total.toFixed(2).replace('.', ',');
}

// --- Listeners de Evento ---

// 1. Adiciona o evento de clique para cada botão "Comprar"
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// 2. Abre o Modal do Carrinho ao clicar no ícone
cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.classList.add('visible');
    updateCartDisplay(); 
});

// 3. Fecha o Modal do Carrinho
closeCartButton.addEventListener('click', () => {
    cartModal.classList.remove('visible');
});

// 4. Simulação de Busca
document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.trim();
    if (searchTerm) {
        // Em um projeto real, esta função faria uma requisição para o servidor 
        // e filtraria os produtos dinamicamente.
        alert(`Simulação de busca: Resultados para "${searchTerm}" seriam carregados aqui!`);
    }
});
