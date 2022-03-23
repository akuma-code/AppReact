import axios from "axios";



export const _getData = async () => {
    const data = await axios.get("")
    return data
}

// _getData()