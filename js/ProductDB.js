let DB_PRODUCT = "dbProduct";

let products = [
    { code: 1, name: "babador_1", description: "babador", price: 25.00, imageName: "babador_1.jpg", category: "Babadores" },
    { code: 2, name: "babador_2", description: "babador", price: 25.00, imageName: "babador_2.jpg", category: "Babadores" },
    { code: 3, name: "babador_3", description: "babador", price: 30.00, imageName: "babador_3.jpg", category: "Babadores" },
    { code: 4, name: "babador_4", description: "babador", price: 25.00, imageName: "babador_4.jpg", category: "Babadores" },
    { code: 5, name: "babador_5", description: "babador", price: 25.00, imageName: "babador_5.jpg", category: "Babadores" },
    { code: 6, name: "babador_6", description: "babador", price: 25.00, imageName: "babador_6.jpg", category: "Babadores" },
    { code: 7, name: "faixa_1", description: "faixa", price: 20.00, imageName: "faixa_1.jpg", category: "Faixas" },
    { code: 8, name: "faixa_2", description: "faixa", price: 10.00, imageName: "faixa_2.jpg", category: "Faixas" },
    { code: 9, name: "faixa_3", description: "faixa", price: 10.00, imageName: "faixa_3.jpg", category: "Faixas" },
    { code: 10, name: "faixa_4", description: "faixa", price: 10.00, imageName: "faixa_4.jpg", category: "Faixas" },
    { code: 11, name: "faixa_5", description: "faixa", price: 10.00, imageName: "faixa_5.jpg", category: "Faixas" },
    { code: 12, name: "faixa_6", description: "faixa", price: 10.00, imageName: "faixa_6.jpg", category: "Faixas" },
    { code: 13, name: "faixa_7", description: "faixa", price: 10.00, imageName: "faixa_7.jpg", category: "Faixas" },
    { code: 14, name: "faixa_8", description: "faixa", price: 20.00, imageName: "faixa_8.jpg", category: "Faixas" },
    { code: 15, name: "laço_1", description: "laço", price: 15.00, imageName: "laço_1.jpg", category: "Laços" },
    { code: 16, name: "laço_2", description: "laço", price: 15.00, imageName: "laço_2.jpg", category: "Laços" },
    { code: 17, name: "laço_3", description: "laço", price: 15.00, imageName: "laço_3.jpg", category: "Laços" },
    { code: 18, name: "laço_4", description: "laço", price: 15.00, imageName: "laço_4.jpg", category: "Laços" },
    { code: 19, name: "laço_5", description: "laço", price: 15.00, imageName: "laço_5.jpg", category: "Laços" },
    { code: 20, name: "laço_6", description: "laço", price: 15.00, imageName: "laço_6.jpg", category: "Laços" },
    { code: 21, name: "laço_7", description: "laço", price: 15.00, imageName: "laço_7.jpg", category: "Laços" },
    { code: 22, name: "laço_8", description: "laço", price: 15.00, imageName: "laço_8.jpg", category: "Laços" },
    { code: 23, name: "laço_9", description: "laço", price: 15.00, imageName: "laço_9.jpg", category: "Laços" },
    { code: 24, name: "laço_10", description: "laço", price: 15.00, imageName: "laço_10.jpg", category: "Laços" },
    { code: 25, name: "laço_11", description: "laço", price: 15.00, imageName: "laço_11.jpg", category: "Laços" },
    { code: 26, name: "laço_12", description: "laço", price: 15.00, imageName: "laço_12.jpg", category: "Laços" },
    { code: 27, name: "laço_13", description: "laço", price: 15.00, imageName: "laço_13.jpg", category: "Laços" },
    { code: 28, name: "laço_14", description: "laço", price: 15.00, imageName: "laço_14.jpg", category: "Laços" },
    { code: 29, name: "laço_15", description: "laço", price: 15.00, imageName: "laço_15.jpg", category: "Laços" },
    { code: 30, name: "tiara_turbante_1", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_1.jpg", category: "Tiaras turbantes" },
    { code: 31, name: "tiara_turbante_2", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_2.jpg", category: "Tiaras turbantes" },
    { code: 32, name: "tiara_turbante_3", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_3.jpg", category: "Tiaras turbantes" },
    { code: 33, name: "tiara_turbante_4", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_4.jpg", category: "Tiaras turbantes" },
    { code: 34, name: "tiara_turbante_5", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_5.jpg", category: "Tiaras turbantes" },
    { code: 35, name: "tiara_turbante_6", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_6.jpg", category: "Tiaras turbantes" },
    { code: 36, name: "tiara_turbante_7", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_7.jpg", category: "Tiaras turbantes" },
    { code: 37, name: "tiara_turbante_8", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_8.jpg", category: "Tiaras turbantes" },
    { code: 38, name: "tiara_turbante_9", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_9.jpg", category: "Tiaras turbantes" },
    { code: 39, name: "tiara_turbante_10", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_10.jpg", category: "Tiaras turbantes" },
    { code: 40, name: "tiara_turbante_11", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_11.jpg", category: "Tiaras turbantes" },
    { code: 41, name: "tiara_turbante_12", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_12.jpg", category: "Tiaras turbantes" },
    { code: 42, name: "tiara_turbante_13", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_13.jpg", category: "Tiaras turbantes" },
    { code: 43, name: "tiara_turbante_14", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_14.jpg", category: "Tiaras turbantes" },
    { code: 44, name: "tiara_turbante_15", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_15.jpg", category: "Tiaras turbantes" },
    { code: 45, name: "tiara_turbante_16", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_16.jpg", category: "Tiaras turbantes" },
    { code: 46, name: "tiara_turbante_17", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_17.jpg", category: "Tiaras turbantes" },
    { code: 47, name: "tiara_turbante_18", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_18.jpg", category: "Tiaras turbantes" },
    { code: 48, name: "tiara_turbante_19", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_19.jpg", category: "Tiaras turbantes" },
    { code: 49, name: "tiara_turbante_20", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_20.jpg", category: "Tiaras turbantes" },
    { code: 50, name: "tiara_turbante_21", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_21.jpg", category: "Tiaras turbantes" },
    { code: 51, name: "tiara_turbante_22", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_22.jpg", category: "Tiaras turbantes" },
    { code: 52, name: "tiara_turbante_23", description: "tiara_turbante", price: 20.00, imageName: "tiara_turbante_23.jpg", category: "Tiaras turbantes" }
]

let ProductDB = {

    initProduct: function() {
        Debug.print("initProduct()");
        let json = window.localStorage.getItem(DB_PRODUCT);
        Debug.print(json);
        if (json == null)
            ProductDB.saveProduct();
        else
            ProductDB.retrieveProduct();
    },

    saveProduct: function() {
        Debug.print("saveProduct()");
        let json = JSON.stringify(products);
        window.localStorage.setItem(DB_PRODUCT, json);
    },

    retrieveProduct: function() {
        Debug.print("retrieveProduct()");
        let json = window.localStorage.getItem(DB_PRODUCT);
        ProductDB.products = JSON.parse(json);
    },

    getIndexProductByCode: function(productCode) {
        if (ProductDB.products == null)
            return -1;
        else
            return ProductDB.products.findIndex(product => product.code == productCode);
    },

    getProductByCode: function(productCode) {
        let index = ProductDB.getIndexProductByCode(productCode);
        if (index >= 0) {
            return ProductDB.products[index];
        }
    },

    addProduct: function(code, name, description, price, imageName) {
        Debug.print("addProduct()");
        let product = { code: 0, name: "name_0", description: "description", price: 0.00, imageName: "name_0.jpg", category: "category" }
        product.code = ProductDB.getNextCodeProduct().toString();
        product.name = name;
        product.description = description;
        product.price = price;
        product.imageName = imageName;
        ProductDB.products.push(product);
        ProductDB.saveProduct();
        ProductDB.retrieveProduct();
    },

    getNextCodeProduct: function() {
        let code = 0;
        if (ProductDB.products == null)
            code = 1;
        else
            for (let i = 0; i < ProductDB.products.length; i++) {
                if (ProductDB.products[i].code >= code)
                    code = parseInt(ProductDB.products[i].code) + 1;
            }
        return code;
    },

    getProductList: function() {
        ProductDB.retrieveProduct();
        return ProductDB.products;
    },

    deleteProduct: function(code) {
        Debug.print("deleteProduct()");
        let index = ProductDB.getIndexProductByCode(code);
        if (index >= 0) {
            products.splice(index, 1);
            ProductDB.saveProduct();
            ProductDB.retrieveProduct();
        }
    },

    editProduct: function(code, name, description, price) {
        Debug.print("editProduct()");
        let index = ProductDB.getIndexProductByCode(code);
        if (index >= 0) {
            products[index].name = name;
            products[index].description = description;
            products[index].price = price;
            ProductDB.saveProduct();
            ProductDB.retrieveProduct();
        }
    },

    getCategorys: function() {
        let categorys = [];
        let allProducts = ProductDB.getProductList();
        for (let i = 0; i < allProducts.length; i++) {
            let product = allProducts[i];
            let index = categorys.findIndex(category => category.category == product.category);
            if (index == -1) {
                let category = { menu: "", category: "" };
                category.menu = product.category;
                category.category = product.category;
                categorys.push(category);
            }
        }
        return categorys;
    },

};

ProductDB.initProduct();