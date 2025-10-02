

export const addproducts = async (req, res) =>
{
  const products = req.body.products;
  if(!products || !Array.isArray(products) || products.length === 0)
  {
    return res.status(400).json({message: "Products are required and should be an array"})
  }
  console.log("user:", req.user._id)
  const currentUser = await User.findById(req.user._id)
  console.log("before user:",currentUser)
  if(!Array.isArray(currentUser.products))
  {
    currentUser.products = products
  }
  if(currentUser.products.length==0)
  {
    currentUser.products = products
  }
  else
  {
    for(const i of products)
  {
    if(!currentUser.products?.includes(i))
    {
      currentUser.products.push(i)
    }
  }
  }
  currentUser.products = [...new Set([...currentUser.products, ...products])]
  await currentUser.save()
  console.log("after user:", currentUser)
  return res.status(200).json({message: "Products added successfully", products: currentUser.products})
}