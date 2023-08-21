import { id } from 'element-plus/es/locale';
import  request from './request'
import { SearchDataType } from "@/type";

//搜索
export const searchApi = (data:SearchDataType) => {
    return request.post(
        `/cloudsearch?keywords=${data.keywords}&offset=${data.offset}&type=${data.type}`
    )
}

//获得专辑内的歌曲
export const getAlbumList = (id) => {
    return request.post(`/album?id=${id}`)
}