class Swiper {
    constructor() {
        this.page = 0
        this.item = document.querySelector('.item')
        this.wrapper = document.querySelector('.items')
        this.pagesLength = this.wrapper.children.length

        this.initEvents()
    }

    throttle = (type, name, obj) => {
        obj = obj || window
        let running = false
        let func = function () {
            if (running) {
                return
            }
            running = true
            requestAnimationFrame(function () {
                obj.dispatchEvent(new CustomEvent(name))
                running = false
            })
        }
        obj.addEventListener(type, func)
    }

    initEvents = () => {
        this.throttle('resize', 'optimizedResize')

        this.onResize()
        window.addEventListener('optimizedResize', this.onResize)
    }

    getPageWidth = () => {
        return this.item.offsetWidth
    }

    calculateOffset = () => {
        return this.getPageWidth() * this.page * -1
    }

    onResize = () => {
        const doc = document.documentElement
        doc.style.setProperty('--app-height', `${window.innerHeight}px`)
        window.scrollBy(0, 0)
    }
}

const elementVisibleInPercent = (element) => {
    return new Promise((resolve, reject) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                resolve(Math.floor(entry.intersectionRatio * 100))
                clearTimeout(timeout)
                observer.disconnect()
            })
        })

        observer.observe(element)

        const timeout = setTimeout(() => {
            reject()
        }, 500)
    })
}

const ready = (fn) => {
    if (document.readyState !== 'loading') {
        fn()
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
}

ready(function () {
    const swiper = new Swiper()
})
