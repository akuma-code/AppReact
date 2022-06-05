export const useConsole = (data) => console.log("logged data:", JSON.stringify(data, null, 2))

export const useCallCount = (module) => { return (execPlace) => console.count(`${module} called from ${execPlace}`) }