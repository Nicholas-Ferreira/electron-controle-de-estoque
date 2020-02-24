
function getProduct(uuid) {
  return db.collection("products").doc(uuid)
    .get().then(function (product) {
      if (product.exists) {
        return product.data()
      } else {
        return false
      }
    })
}