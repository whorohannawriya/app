import Product from "../models/products.js";
import networkCall from "./api-client.js";

const productOperations= {
    products:[],
    
async loadProducts(){
    const pizza= await networkCall();
    const pizzaArray= pizza['Vegetarian'];
    console.log("array is",pizzaArray)
    const productsArray= pizzaArray.map(pizza=>{
        const currentPizza= new Product(pizza.id,pizza.name,
            pizza.menu_description,pizza.price, pizza.assets.product_details_page[0].url);
            return currentPizza;
    })
    console.log("products array", productsArray);
    this.products= productsArray;
    return productsArray;
},
search(pizzaId){
const product= this.products.find(currentProduct=>currentProduct.id==pizzaId);
console.log('product found', product);
//product.isAddedInCart= true;
return product;

},
getProductsInCart(){
    const getProducts= this.products.filter(product=> product.isAddedInCart);
    return getProducts;
}

    }
    export default productOperations;
