import exp from "constants"

//定义我们的接口类型
export interface loginData{
    username:string
    password:string | number
    email?:string
}

export interface SearchDataType{
    keywords:string | null
    type?:string | number |null
    offset?:number | null

}