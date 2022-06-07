
import { useState } from "react"
import { useConsole } from "./useConsole";

export const useStoreRefresh = (request, storeSetter) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")
    const refresh = async (...args) => {
        try {
            setIsLoading(true)
            await request(...args).then(data => storeSetter(data))
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    useConsole(refresh)

    return [refresh, isLoading, error]

}