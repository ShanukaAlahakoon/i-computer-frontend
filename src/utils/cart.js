import toast from "react-hot-toast";

export function getCart() {
  const cartString = localStorage.getItem("cart");

  if (cartString == null) {
    localStorage.setItem("cart", "[]");
    return [];
  } else {
    const cart = JSON.parse(cartString);
    return cart;
  }
}

export function addToCart(product, quantity) {
  const cart = getCart();

  const index = cart.findIndex((item) => item.productID == product.productID);

  if (index == -1) {
    cart.push({
      productID: product.productID,
      name: product.name,
      price: product.price,
      labeledPrice: product.labeledPrice,
      quantity: quantity,
      image: product.images[0],
    });

    toast.success(`${product.name} added to cart`);
  } else {
    const newQty = cart[index].quantity + quantity;
    if (newQty <= 0) {
      cart.splice(index, 1);
      toast.success(`${product.name} removed from cart`);
    } else {
      cart[index].quantity = newQty;
      toast.success(`Updated quantity of ${product.name} to ${newQty}`);
    }
  }

  const cartString = JSON.stringify(cart);
  localStorage.setItem("cart", cartString);
}

export function emptyCart() {
  localStorage.setItem("cart", "[]");
}

export function getCartTotal() {
  let total = 0;
  const cart = getCart();
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  return total;
}
