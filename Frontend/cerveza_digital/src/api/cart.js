const PRODUCT_CART = 'productsCart'

//OBTENER PRODUCTOS SI YA LOS HAY
export function getProductsCart() {
    const response = localStorage.getItem(PRODUCT_CART)
    return JSON.parse(response || '[]')
}

//AÑADIR PRODUCTO AL CARRITO    
export function addProductCart(idProduct) {
    const products = getProductsCart()
    products.push(idProduct)
    localStorage.setItem(PRODUCT_CART, JSON.stringify(products))
}

//ELIMINAR UN PRODUCTO DEL CARRITO
export function removeProductCart(index) {
    const idProducts = getProductsCart()
    idProducts.splice(index, 1)
    localStorage.setItem(PRODUCT_CART, JSON.stringify(idProducts))
}

//LIMPIAR EL CARRITO
export function cleanProductCart() {
    localStorage.removeItem(PRODUCT_CART)
}