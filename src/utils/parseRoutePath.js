export function parseRoutePath(path){
  const routeParametersRegex = /:([a-zA-z]+)/g
  // products/:id

  const params = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9-_]+)")

  const pathRegex = new RegExp(`^${params}(?<query>\\?(.*))?$`)

  return pathRegex
}