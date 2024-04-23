import axios from 'axios'

import React from 'react'

const HttpService = async(method,url,data=null,headers={}) => {
    try{
        const response=await axios(
            {
                method:method,
                url:url,
                data:data,
                headers:headers
            }
        )
        console.log(response);
        return response;
    }catch(error){
        console.log("threw error:")
        throw error.response || error; 
    }
      
}

// const handleHttpError =(error)=>{
//     if (error.response) {
//         if(error.response.status===401)
//             alert(error.response.data.message);
//         else
//             console.log(error.response.data.message);
//     } else {
//         console.log(error.message);
//     }
// }

export default HttpService