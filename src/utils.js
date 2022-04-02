
const backendURL = process.env.BACKEND_URL || 'http://localhost:2333';


const respValidate = (resp)=>{
    const err = resp?.error
    if (err){
        throw new Error(err)
    }
    return resp
}

const params2uri = (params)=>{
    let uri = '?'
    for (let key in params){
        const value = params[key]
        if (value !==undefined && value !==null && value !==''){
            uri += `${key}=${params[key]}&`
        }
    }
    return uri.slice(0, -1)
}


export const fetchLatestPosts = (keyword) =>{
    let params = {keyword}
    return fetch(`${backendURL}/keyword/post/latest${params2uri(params)}`)
    .then(resp=>resp.json())
    .then(respValidate)
}

export const fetchKeywordList = () =>{
    return fetch(`${backendURL}/keyword/list`)
    .then(resp=>resp.json())
    .then(respValidate)
}


// in json format
export const createKeyword = (keyword) =>{
    let params = {keyword}
    return fetch(`${backendURL}/keyword/create`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
    .then(resp=>resp.json())
    .then(respValidate)
}


// given time,out put a string like '1 hour ago'
export const timeAgo = (time) =>{
    const now = new Date()
    const diff = now.getTime() - time
    if (diff < 60000){
        return '刚刚'
    }
    if (diff < 3600000){
        return Math.floor(diff/60000) + ' 分钟前'
    }
    if (diff < 86400000){
        return Math.floor(diff/3600000) + ' 小时前'
    }
    if (diff < 604800000){
        return Math.floor(diff/86400000) + ' 天前'
    }
    if (diff < 2419200000){
        return Math.floor(diff/604800000) + ' 周前'
    }
    return Math.floor(diff/2419200000) + ' 月前'
}