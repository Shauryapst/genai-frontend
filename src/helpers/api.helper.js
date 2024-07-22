import axios from 'axios';

const local_instance = axios.create({
    baseURL: 'http://localhost:8080/api'
})

const apiHelper = {
    sendLocal: async({url, method, payload={}, query={}, headers={}}) =>{
        method = method.toUpperCase();
        const reqHeaders = {
            Accept:  "application/json",
            "Content-Type": "application/json"
        }
        try{
            let response;
            let options = {
                url: url,
                method: method,
                params: query,
                data: payload,
                headers: {...reqHeaders, ...headers},
                timeout: 120*1000,
            }
            response = await local_instance(options);
            return response;
        }
        catch(error){
            return error.response;
        }
    }
}

export default apiHelper;