const express = require("express")
const cors = require('cors')
const PORT = 8000;

const app = express()
app.use(cors());

app.get('/', (req, res) => {
    res.send("Homepage")
})

app.get('/api/products', (req, res) => {
    const dbProducts = require('./data/product.json')
    res.json(dbProducts)
})

app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const dbProducts = require('./data/product.json')

    const product = dbProducts.products.find(item => item.id === productId)
    if (product) {
        res.json(product)
    }
    else {
        res.status(404).json({ message: "Không tìm thấy sản phẩm..." })
    }
})

app.listen(PORT, () => {
    console.log("Server is running ....")
})

