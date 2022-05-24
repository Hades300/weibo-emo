
const backendURL = process.env.BACKEND_URL || 'http://localhost:8000';


const respValidate = (resp)=>{
    if (resp.status !== 200){
        throw new Error(resp.statusText)
    }
    let ret = resp.json()
    const detail = ret?.detail
    if (detail){
        throw new Error(detail)
    }
    return ret
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


export const fetchLatestPosts = (keyword,count) =>{
    let params = {keyword,count}
    return fetch(`${backendURL}/keyword/post/latest${params2uri(params)}`)
    .then(respValidate)
}

export const fetchKeywordList = () =>{
    return fetch(`${backendURL}/keyword/list`)
    .then(respValidate)
}

export const fetchTaskList = (page,name,type) =>{
    let params = {page,name,type}
    return fetch(`${backendURL}/task/list${params2uri(params)}`)
    .then(respValidate)
}

export const fetchMediaList = (keyword) => {
    let params = {keyword}
    return fetch(`${backendURL}/keyword/media/list${params2uri(params)}`)
    .then(respValidate)
}

export const fetchAllEmotionFace = () =>{
    return fetch(`${backendURL}/emotion/all`)
    .then(respValidate)
}

export const getMobileURL = (payload) => {
    return `${backendURL}/parse/mobile${params2uri({payload})}`
}


// in json format
export const createKeyword = (keyword) =>{
    return new Promise((resolve,reject)=>{
        if (typeof(keyword) !== 'string'){
            throw new Error('keyword must be a string')
        }
        if (keyword.length>20){
            throw new Error('关键字过长,需小于20个字符')
        }
        let params = {keyword}
        return fetch(`${backendURL}/keyword/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then(respValidate)
    })
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

export const label2Color = (name) => {
    switch (name) {
        case "angry":
            return "#EE362C"
        case "fear":
            return "#F26F15"
        case "happy":
            return "#1EAF46"
        case "sad":
            return "#33B1EB"
        case "surprise":
            return "#F5B20B"
        case "neutral":
            return "#656565"
        default:
            return "#656565"
    }
}

export const label2Text = (name) => {
    switch (name) {
        case "angry":
            return "愤怒"
        case "fear":
            return "恐惧"
        case "happy":
            return "高兴"
        case "sad":
            return "悲伤"
        case "surprise":
            return "惊讶"
        case "neutral":
            return "中立"
        default:
            return "???"
    }
}