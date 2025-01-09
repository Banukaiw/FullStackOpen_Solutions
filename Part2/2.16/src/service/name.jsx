import axios from 'axios';
const baseURL = "http://localhost:3001/persons";

const getALL=()=>{
    const request=axios.get(baseURL)
    return request.then((response)=>response.data)
}

const Create=(newObject)=>{
    const request=axios.post(baseURL,newObject)
    return request.then((response)=>response.data)
}

const remove=(id)=>{
    const request=axios.delete(`${baseURL}/${id}`)
    return request.then((response)=>response.data)
}

const update=(id,nemeObject)=>{
    const request=axios.put(`${baseURL}/${id}`,nemeObject)
    return request.then((response)=>response.data)
}


export default {
    getALL,
    Create,
    remove,
    update,
}