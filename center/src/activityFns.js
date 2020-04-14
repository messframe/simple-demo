function prefix(location, name, routerMode) {
  return location.href.indexOf(`${location.origin}${routerMode === 'hash' ? '/#' : ''}/${name}`) !== -1
}

export default function isActive (name, routerMode) {
  return (location) => {
    return prefix(location, name, routerMode)
  }
}