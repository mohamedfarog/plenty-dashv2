import { DataService } from "../../utils/DataService";

async function addNewDesigner(params){
  return await DataService.post("createShop", params )
}
async function getAllDesigner(params){
  return await  DataService.get('getAllShops', params)
}
async function deleteDesigner(params){
  return await DataService.post('deleteShop',params)
}
async function editDesigner(params){
  return await DataService.post('updateShop',params)
}

async function getImagesUrls(params){
  return await DataService.post('uploadImageOnDash', params)
}

export{
  getImagesUrls,
  addNewDesigner, 
  getAllDesigner,
  deleteDesigner,
  editDesigner,
 
}