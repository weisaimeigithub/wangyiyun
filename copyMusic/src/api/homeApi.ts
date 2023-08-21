import requests from './request'
export const bannerApi = ()  => {
     return requests.get('/banner?type=0')
}

export const recommendMusicApi = (limit:number) => {
    return requests.get(`/personalized?limit=${limit}`)
}