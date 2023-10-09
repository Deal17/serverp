import  express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const productsRouter = express.Router();
productsRouter.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonFilePath = path.join(__dirname, "../routes/products.json");

// Utiliza fs/promises para leer el archivo JSON de manera asincrónica
let products;
async function loadProducts() {
  try {
    const data = await fs.readFile(jsonFilePath, "utf8");
    products = JSON.parse(data);
  } catch (error) {
    console.error("Error al cargar los datos de productos desde el archivo JSON:", error);
    products = [];
  }
}
loadProducts(); // Carga los productos al iniciar la aplicación

// Obtener todos los productos
productsRouter.get('/', (req, res) => {
  const limit = parseInt(req.query.limit) || products.length;
  const result = products.slice(0, limit);
  res.json(result);
});
async function saveProducts() {
  try {
    await fs.writeFile(jsonFilePath, JSON.stringify(products, null, 2), 'utf8');
  } catch (error) {
    console.error('Error al guardar los datos de productos en el archivo JSON:', error);
  }
}
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
// Agregar un producto
productsRouter.post('/', (req, res) => {
  const { title, description, price, thumbnail, code, size, stock } = req.body;

  // Encuentra el último ID en la lista de productos
  const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;

  const newProduct = {
    // Asigna un nuevo ID
    title,
    description,
    price,
    thumbnail,
    code,
    size,
    stock,
    id: lastProductId + 1
  };

  products.push(newProduct);

  // Después de agregar un producto, guarda los datos en el archivo JSON
  saveProducts();

  res.status(201).json(newProduct);
});

// Actualizar un producto
productsRouter.put('/update/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };

    // Después de actualizar un producto, guarda los datos en el archivo JSON
    saveProducts();

    res.json(updatedProduct); // Responde con el producto actualizado
  } else {
    res.status(404).json({ error: 'Producto no encontrado por el ID especificado' });
  }
});
// Eliminar un producto
productsRouter.delete('/delete/:id', (req, res) => {

  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);
console.log (products);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);

    // Después de eliminar un producto, guarda los datos en el archivo JSON
    saveProducts();

    res.json({ message: 'Producto eliminado' });
  } else {
    res.status(404).json({ error: 'Producto no encontrado por el ID especificado' });
  }
});
export default productsRouter;