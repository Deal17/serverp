import express from 'express';
import productsRouter from '../src/routes/productRoutes.js';
import cartRouter from '../src/routes/cartRoutes.js';

const app = express();

app.use(express.json());

// Montar el enrutador de productos en /products
app.use('/products', productsRouter);

// Montar el enrutador del carrito en /carts
app.use('/carts', cartRouter);


// Iniciar el servidor en el puerto 8080
app.listen(8080, () => console.log('Listening on port 8080'));