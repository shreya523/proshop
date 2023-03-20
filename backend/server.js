import express from "express"
import dotenv from "dotenv"
import path from "path"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"
import shippingAddressRoutes from "./routes/shippingAddressRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import paymentsRoutes from "./routes/paymentRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

connectDB()
const app = express()

app.use(express.json())

dotenv.config()

app.use((req, res, next) => {
  next()
})

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/shipping", shippingAddressRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/config/razorpay", paymentsRoutes)

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")))
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  )
} else {
  app.get("/", (req, res) => {
    res.send("API is running...")
  })
}

app.use(notFound, errorHandler)

if (process.env.NODE_ENV === "production") {
}

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
