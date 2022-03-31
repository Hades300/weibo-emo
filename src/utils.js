
const backendURL = process.env.BACKEND_URL || 'http://localhost:2333';


const respValidate = (resp)=>{
    const err = resp?.error
    if (err){
        throw new Error(err)
    }
    return resp
}


export const fetchLatestPosts = (keyword) =>{
    let params = {}
    if (keyword){
        params['keyword'] = keyword
    }
    return fetch(`${backendURL}/keyword/post/latest`,{
        method: 'GET',
        params: params
    }).then(resp=>resp.json()).then(respValidate)
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