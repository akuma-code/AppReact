export const useConsole = (data, cb = null) => {

    const str = JSON.stringify(data, null, 2)
    if (cb) return cb(str)
    console.log("logged data:", str)
}

export const useCallCount = (module) => { return (execPlace) => console.count(`${module} called from ${execPlace}`) }