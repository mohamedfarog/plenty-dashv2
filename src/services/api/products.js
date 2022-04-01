import { DataService } from "../../utils/DataService";


async function getProducts(params){
  return await DataService.get('/getProducts',params)
}
async function uploadImage(params){
  return await DataService.post('uploadImage',params)
}
async function getDesignersCats( params){
  return await DataService.get('getAllDesignerCats',params);
}
async function getShops(params){
  return await DataService.get('getAllShops',params)
}
async function getProductImageUrl(params){
  return await DataService.post('uploadImageOnDash',params)
}
async function addProduct(params){
  return await DataService.post('addProduct',params);
}
async function deleteproduct(params){
  return await DataService.post(`deleteProduct/${params.id}`, params)
}
async function editProduct(params){
  return await DataService.post('updateProduct', params)
}
export{
  getProducts,
  uploadImage,
  getDesignersCats,
  getShops,
  getProductImageUrl,
  addProduct,
  deleteproduct,
  editProduct
}