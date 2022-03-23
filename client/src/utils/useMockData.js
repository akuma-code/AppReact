import axios from "axios";


export const _getData = async () => {
    const data = await fetch("../model/mockdb.json").
        then(result => result)
    return data
}

