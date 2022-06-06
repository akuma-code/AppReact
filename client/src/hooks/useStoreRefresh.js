import { useState } from "react"

export const useStoreRefresh = (request, storeSetter) => {

    const refresh = async (...args) => {
        const [isLoading, setIsLoading] = useState(false);
        try {
            setIsLoading(true)
            await request(...args).then(data => storeSetter(data))
        } catch (error) {
            alert(error)
        } finally {
            setIsLoading(false)
        }
    }
    return [refresh, isLoading]

}