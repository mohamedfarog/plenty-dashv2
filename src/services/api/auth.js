import { DataService } from "../../utils/DataService";


async function adminSignIn(data)
{
  return await DataService.post('adminLogin', data)
}
export{
  adminSignIn
}