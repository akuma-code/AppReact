const objDestruct = (obj) => {
    let res = []
    Object.entries(obj).map(([k, v]) => {
        res.push(`${k}: ${v}`)
    })
    return res
}



export const useConsole = (data, cb = null) => {
    const obj = objDestruct(data)
    const str = JSON.stringify(data, null, 2)
    if (cb) return cb(str)
    // console.log("logged data:", str)
    console.log("Properties: ", obj);
}

export const useCallCount = (module) => { return (execPlace) => console.count(`${module} called from ${execPlace}`) }

export const useSpyState = (args) => console.log(JSON.parse(JSON.stringify(...args)))