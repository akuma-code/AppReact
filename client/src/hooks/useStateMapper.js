export function useStateMapper(state_query = []) {
    const map = new Map();
    const getID = (item = { id: "" }) => {
        const id = `${item.id}`

        id && map.set(id, item)

    }

    state_query.forEach(getID)

    return function (key) {
        const obj = Object.fromEntries(map)
        if (typeof key === 'string') return obj[key]
        else return obj[`${key}`]
    }
}