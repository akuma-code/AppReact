export const isEqualString = (valNEW = '', valOLD = '') => {
    const txt = `[${valOLD}, NEW: ${valNEW}]`
    console.log(txt)
    if (typeof valNEW != String || typeof valOLD != String) return false
    if (valNEW === '') return false

    if (valNEW.toLowerCase() === valOLD.toLowerCase()) return true

    return false
}

function useCompareVals(valueNEW, valueOLD) {
    const isSame = isEqualString(valueNEW, valueOLD)
    if (isSame) return [isSame,]

}