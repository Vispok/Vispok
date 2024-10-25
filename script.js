let cartCount = 0;
const cartItems = [];

// Function to update cart count display
function updateCartCount() {
    document.getElementById('cart-count').textContent = cartCount;
}

// Function to add products to cart
document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const name = product.getAttribute('data-name');
        const priceBH1 = parseInt(product.getAttribute('data-price-bh1'));
        const priceBH2 = parseInt(product.getAttribute('data-price-bh2'));

        const selectedHostel = document.getElementById('hostel').value;
        const price = selectedHostel === 'BH2' ? priceBH2 : priceBH1;

        cartItems.push({ name, price });
        cartCount++;
        updateCartCount();

        alert(`${name} has been added to your cart for ₹${price}`);
        document.getElementById('checkout').style.display = 'block';
    });
});

// Proceed to payment
document.getElementById('proceed-to-pay').addEventListener('click', () => {
    if (cartCount === 0) {
        alert("Your cart is empty.");
        return;
    }
    
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('order-modal').style.display = 'block';
    document.getElementById('modal-total').textContent = `Total: ₹${total}`;
});

// Close the modal
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('order-modal').style.display = 'none';
});

// Submit order form
document.getElementById('order-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const room = document.getElementById('room').value;

    const total = cartItems.reduce((sum, item) => sum + item.price, 0); // Calculate total again
    const message = `Order Details:\nName: ${name}\nPhone: ${phone}\nRoom: ${room}\nTotal: ₹${total}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=7078268582&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl);
    
    // Reset cart and close modal
    document.getElementById('order-modal').style.display = 'none';
    cartCount = 0;
    cartItems.length = 0;
    updateCartCount();
});
