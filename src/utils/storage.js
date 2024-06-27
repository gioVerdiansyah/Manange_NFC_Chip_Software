const getItemFromLocalStorage = (storageName) => {
    let item = localStorage.getItem(storageName)
    return item == null ? false : item
}

export {
    getItemFromLocalStorage
}