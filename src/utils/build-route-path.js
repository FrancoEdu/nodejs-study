export function buildRoutePath(path){
    const routeParametersRegex = /:([a-zA-Z]+)/g
    return new RegExp(path.matchAll(routeParametersRegex))
}