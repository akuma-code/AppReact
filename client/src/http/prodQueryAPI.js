import { $authHost, $host } from "./index";


export const startProdQuery = async (productionQueryForm = []) => {
    const data = {}
    let postitem;
    productionQueryForm.map(async (form) => {
        postitem = await $authHost.post('api/prod', form)
        // data[form.title] = form.count
    })
    console.log('productionQueryForm :>> ', productionQueryForm);
    return data
}

export const fetchSklad = async () => {
    const { data } = await $host.get('api/sklad')
    console.log('>>><<<skladIts', data.rows);
    return data.rows
}