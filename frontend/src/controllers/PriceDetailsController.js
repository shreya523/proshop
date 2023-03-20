export const priceDetails = (cartItems) => {
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  let itemsPrice, shippingPrice, taxPrice, totalPrice, selectedItems
  itemsPrice = shippingPrice = taxPrice = totalPrice = 0.0
  selectedItems = 0

  if (cartItems && cartItems.length > 0) {
    selectedItems = cartItems.filter((item) => item.selected).length
    itemsPrice = addDecimals(
      cartItems.reduce((acc, item) => {
        if (item.selected) {
          acc += item.qty * item.price
        }
        return acc
      }, 0)
    )
    if (selectedItems > 0) {
      shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)
      taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))
      totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
      ).toFixed(2)
    }
  }

  return { itemsPrice, shippingPrice, taxPrice, totalPrice, selectedItems }
}
