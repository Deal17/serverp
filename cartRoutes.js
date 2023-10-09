import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promises as fs } from 'fs';
import path from 'path'

const cartRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonFilePath = path.join(__dirname, './cart.json'); // Define jsonFilePath

let cart = [];

// Función para cargar los datos del carrito desde el archivo JSON
async function loadCart() {
  try {
    const data = await fs.readFile(jsonFilePath, 'utf8');
    cart = JSON.parse(data);
  } catch (error) {
    console.error('Error al cargar los datos del carrito desde el archivo JSON:', error);
    cart = [];
  }
}

// Función para guardar los datos del carrito en el archivo JSON
async function saveCart() {
  try {
    await fs.writeFile(jsonFilePath, JSON.stringify(cart, null, 2), 'utf8');
  } catch (error) {
    console.error('Error al guardar los datos del carrito en el archivo JSON:', error);
  }
}

loadCart(); // Carga el carrito al iniciar la aplicación

// Agregar un producto al carrito
cartRouter.post('/add/:id', (req, res) => {
  const productId = parseInt(req.params.id);

  // Agregar lógica para encontrar el producto en tu base de datos (por ejemplo, en tu lista de productos)

  // Ejemplo: const productToAdd = products.find((p) => p.id === productId);
  
  // Verificar si el producto existe
  if (!productToAdd) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  // Verificar si el producto ya está en el carrito
  const existingCartItem = cart.find((item) => item.id === productId);

  if (existingCartItem) {
    return res.status(400).json({ error: 'Producto ya agregado al carrito' });
  }

  // Puedes agregar la cantidad si lo deseas
  cart.push({ id: productId, quantity: 1 });

  // Después de agregar un producto al carrito, guarda los datos en el archivo JSON
  saveCart();

  res.json({ message: 'Producto agregado al carrito' });
});

// Eliminar un producto del carrito
cartRouter.delete('/remove/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = cart.findIndex((item) => item.id === productId);

  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
  }

  cart.splice(index, 1);

  // Después de eliminar un producto del carrito, guarda los datos en el archivo JSON
  saveCart();

  res.json({ message: 'Producto eliminado del carrito' });
});

export default cartRouter;
