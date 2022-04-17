import { $authHost, $host } from "./index";


export const startProdQuery = async (productionQueryForm = []) => {
    const data = {}
    let postitem;
    productionQueryForm.map(async (form) => {
        postitem = await $authHost.post('api/prod', form)
        data[form.title] = form.count
    })
    console.log('productionQueryForm :>> ', productionQueryForm);
    return data
}