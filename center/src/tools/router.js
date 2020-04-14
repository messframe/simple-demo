class Router {
    constructor (type) {
        this.type = type
        this.routeArr = []
        this.tempArr = []
    }
    push (location) {
        if (this.type === 'hash') {
            if (location === this.routeArr[this.routeArr.length - 1]) return
            if (this.routeArr.length === 0) {
                this.routeArr.push(window.location.hash.split('#/')[1])
            }
            this.routeArr.push(location)
            this.tempArr = []
            window.location.href = '/#' + location
        } else if (this.type === 'history') {
            window.history.pushState({}, document.title, location)
        }
    }
    back () {
        if (this.type === 'hash') {
            let tempRoute = this.routeArr.pop()
            let backRoute = this.routeArr[this.routeArr.length - 1]
            if (!backRoute) return
            window.location.href = '/#' + backRoute
            this.tempArr.push(tempRoute)
        } else if (this.type === 'history') {
            window.history.back(-1)
        }
    }
    forward () {
        if (this.type === 'hash') {
            if (this.tempArr.length === 0) return
            let route = this.tempArr.shift()
            if (!route || this.routeArr[this.routeArr.length - 1] === route) return
            this.routeArr.push(route)
            window.location.href = '/#' + route
        } else if (this.type === 'history') {
            window.history.forward()
        }
    }
    go (n) {
        n = n || 0
        if (this.type === 'hash') {
            let index = (this.routeArr.length - 1 + n)
            let route = this.routeArr[index]
            if (index >= this.routeArr.length) {
                index = index - this.routeArr.length
                route = this.tempArr[index]
            } else if (index < 0) {
                index = 0
                route = this.routeArr[index]
            }
            if (!route || this.routeArr[this.routeArr.length - 1] === route) return
            this.routeArr.push(route)
            window.location.href = '/#' + route
        } else if (this.type === 'history') {
            window.history.go(n)
        }
    }
}

export default Router