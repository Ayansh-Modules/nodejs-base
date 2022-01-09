const isEmptyObject = (value: object) => value && Object.keys(value).length === 0 && value.constructor === Object

export default {
    isEmptyObject
}