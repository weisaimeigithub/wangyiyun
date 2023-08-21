import requests from "./request";

//播放音乐url
export const getMusicUrl = (id) => {
    return requests.get(`/song/url?id=${id}`)
}

//获取歌单里面的歌曲
export const getSongDeatilList = (id,limit,offset) => {
    return requests.get(
        `playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`
    )
}

//获取歌单信息
export const SongListDetail =(id) => {
    return requests.get(`/playlist/detail?id=${id}`)
}

//获取最新mv
export const getNewVideoUrl = (limit) => {
    return requests.get(`/mv/first?limit=${limit}`)
}