import { client } from "./axios"

export const getTodo = async () => {
    // let data = null

    const res = await client.get('')
    return res
    // if (res.status === 200){
    //     data = res.data
    // }
    

    // return data
}