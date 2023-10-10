import  express  from "express";

const cartRouter = express.Router();

const cart = [];

// Agregar un producto al carrito
cartRouter.post('/add/:id', (req, res) => {
  const productId = parseInt(req.params.id);

  const productToAdd = products.find((p) => p.id === productId);

  if (!productToAdd) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const existingCartItem = cart.find((item) => item.id === productId);

  if (existingCartItem) {
    return res.status(400).json({ error: 'Producto ya agregado al carrito' });
  }

  // Puedes agregar la cantidad si lo deseas
  cart.push({ id: productId, quantity: 1 }); 
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
  res.json({ message: 'Producto eliminado del carrito' });
});

export default cartRouter;
