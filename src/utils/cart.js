import toast from "react-hot-toast";

const getCartKey = () => {
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      const user = JSON.parse(userString);

      return `cart_${user.email}`;
    } catch (e) {
      return "cart";
    }
  }
  return "cart";
};

export function getCart() {
  const key = getCartKey();
  const cartString = localStorage.getItem(key);

  if (cartString == null) {
    return [];
  } else {
    return JSON.parse(cartString);
  }
}

export function addToCart(product, quantity) {
  const cart = getCart();
  const key = getCartKey();

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
  localStorage.setItem(key, cartString);
}

export function emptyCart() {
  const key = getCartKey();
  localStorage.removeItem(key);
}

export function getCartTotal() {
  let total = 0;
  const cart = getCart();
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  return total;
}

export function clearCart() {
  const key = getCartKey();

  localStorage.removeItem(key);
}
