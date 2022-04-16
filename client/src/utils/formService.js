export function _makeProductionForm(item = {}, resultBox = []) {
    const { title, count, date } = item;


    const form = new FormData();
    form.append('title', JSON.stringify(title))
    form.append('count', JSON.stringify(count))
    form.append('date', date)
    resultBox.push(form)
    console.log('Added to form', { title, count, date });
    return resultBox
}