import toast from "react-hot-toast";

// 1. මේක අලුතින් එකතු කරන්න: Cart එකේ නම (Key) තීරණය කරන function එක
const getCartKey = () => {
  const userString = localStorage.getItem("user"); // ඔයාගේ user data තියෙන key එක "user" නම්
  if (userString) {
    try {
      const user = JSON.parse(userString);
      // User කෙනෙක් ඉන්නවා නම් එයාගේ email එකත් එක්ක නම හදනවා
      return `cart_${user.email}`;
    } catch (e) {
      return "cart"; // JSON error ආවොත් සාමාන්‍ය විදියට
    }
  }
  // User කෙනෙක් නැත්නම් (Guest), සාමාන්‍ය "cart" එක පාවිච්චි කරනවා
  return "cart";
};

export function getCart() {
  const key = getCartKey(); // Dynamic Key එක ගන්නවා
  const cartString = localStorage.getItem(key);

  if (cartString == null) {
    return [];
  } else {
    return JSON.parse(cartString);
  }
}

export function addToCart(product, quantity) {
  const cart = getCart(); // දැන් මේකෙන් එන්නේ අදාළ User ගේ Cart එක
  const key = getCartKey(); // Save කරන්න ඕනේ Key එක ගන්නවා

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

  // අදාළ User ගේ නමින්ම Save කරනවා
  const cartString = JSON.stringify(cart);
  localStorage.setItem(key, cartString);
}

export function emptyCart() {
  const key = getCartKey();
  localStorage.removeItem(key); // අදාළ User ගේ Cart එක විතරක් මකනවා
}

export function getCartTotal() {
  let total = 0;
  const cart = getCart();
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  return total;
}
