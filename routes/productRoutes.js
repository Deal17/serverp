import  express from "express";

const productsRouter = express.Router();

  const products = [
    {
      id:1,
      title: "Tenis Globe",
      description: "Tenis de excelente calidad, resistentes y duraderos para montar skateboarding",
      price: 286000,
      thumbnail: "imagen1.jpg",
      code: "TENIS001",
      size: 'US 10',
      stock: 100
    },
    {
      id:2,
      title: "Tenis DC-Shoes",
      description: "Tenis resistentes ideales para practicar skateboarding.",
      price: 310000,
      thumbnail: "imagen2.jpg",
      code: "TENIS002",
      size: 'US 8',
      stock: 50
    },
    {
      id:3,
      title: "Tenis Lakai",
      description: "Tenis elegantes y cómodos para uso diario.",
      price: 360000,
      thumbnail: "imagen3.jpg",
      code: "TENIS003",
      size: 'US 9',
      stock: 75
    },
    {
      id:4,
      title: "Tenis DVS",
      description: "Tenis resistentes ideales para practicar skateboarding.",
      price: 299000,
      thumbnail: "imagen4.jpg",
      code: "TENIS004",
      size: 'US 9.5',
      stock: 60
    },
    {
      id:5,
      title: "Tenis Nike",
      description: "Tenis casuales y cómodos para uso diario.",
      price: 344000,
      thumbnail: "imagen5.jpg",
      code: "TENIS005",
      size: 'US 7.5',
      stock: 40
    },
    {
      id:6,
      title: "Tenis etnies",
      description: "Tenis resistentes ideales para practicar skateboarding.",
      price: 368000,
      thumbnail: "imagen6.jpg",
      code: "TENIS006",
      size: 'US 9.5',
      stock: 90
    },
    {
      id:7,
      title: "Tenis New Balance",
      description: "Tenis casuales y cómodos para uso diario.",
      price: 434000,
      thumbnail: "imagen7.jpg",
      code: "TENIS007",
      size: 'US 8',
      stock: 30
    },
    {
      id:8,
      title: "Tenis vans",
      description: "Tenis con un diseño clásico y retro para amantes de la moda vintage.",
      price: 289000,
      thumbnail: "imagen8.jpg",
      code: "TENIS008",
      size: 'US 9',
      stock: 55
    },
    {
      id:9,
      title: "Tenis Emerica",
      description: "Tenis diseñados para deportistas profesionales.",
      price: 374000,
      thumbnail: "imagen9.jpg",
      code: "TENIS009",
      size: 'US 8.5',
      stock: 25
    },
    {
      id:10,
      title: "Tenis Osiris",
      description: "Tenis con un diseño clásico y retro para amantes de la moda vintage.",
      price: 433000,
      thumbnail: "imagen10.jpg",
      code: "TENIS010",
      size: 'US 9.5',
      stock: 70
    }
  ];


// Obtener todos los productos
productsRouter.get('/', (req, res) => {
  const limit = parseInt(req.query.limit) || products.length;
  const result = products.slice(0, limit);
  res.json(result);
});

// Obtener un producto por ID
productsRouter.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'El producto no existe' });
  }
});
// Agregar un producto sin necesidad de proporcionar el id en la URL
// pruebas con postman
productsRouter.post('/', (req, res) => {
  const { title, description, price, thumbnail, code, size, stock } = req.body;
  const newProduct = {
    title,
    description,
    price,
    thumbnail,
    code,
    size,
    stock,
  };

  if (this.Products.length === 0) {
    newProduct.id = 1;
  } else {
    newProduct.id = this.Products[this.Products.length - 1].id +1;
  }

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Actualizar un producto
productsRouter.put('/update/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado por el ID especificado' });
  }
});

// Eliminar un producto
productsRouter.DELETE('/delete/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.json({ message: 'Producto eliminado' });
  } else {
    res.status(404).json({ error: 'Producto no encontrado por el ID especificado' });
  }
});

export default productsRouter;




