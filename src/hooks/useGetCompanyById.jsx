import { setSingleCompany } from '@/redux/companySlice';
import { COMPANY_API_ENDPOINT} from '@/utils/constant';
import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
  const token = window.localStorage.getItem("token");
    const dispatch=useDispatch();
    useEffect(()=>{
      const fetchSingleCommpany=async ()=>
        {
          try {
            const res=await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`,{
              headers:
              {
                Authorization:token
              },withCredentials:true});
            if(res.data.success)
            {
                dispatch(setSingleCompany(res.data.company));
            }
        } catch (error) {
            console.log(error);
        }
      }
      fetchSingleCommpany();
    },[companyId,dispatch]);
 
}

export default useGetCompanyById;
