import  axios from "axios";
import {Istore} from "../../types/istore.ts";
import {IPageresponse} from "../../types/ipageresponse.ts";

const host = 'http://localhost:8080/api/store'

export const getStoreList = async (page?:number, size?:number): Promise<IPageresponse<Istore>> => {
    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const result = await axios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)
    return result.data
}

export const getStoreDetail = async (storeNo:number): Promise<Istore> => {
    const result = await axios.get(`${host}/read/${storeNo}`);
    return result.data;
}