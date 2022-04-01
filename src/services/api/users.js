import { DataService } from "../../utils/DataService";

async function getUsers(params){
  return await DataService.get('getUsers', params)
}




export{
  getUsers

}