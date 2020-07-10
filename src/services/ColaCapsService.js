
export default class ColaCapsService {

    baseUrl = "http://localhost:8080"
    // baseUrl = "https://colacap.herokuapp.com"

    addCap = async ({name, price, amount, image}) => {
        const form = new FormData()
        form.append('name', name)
        form.append('price', price)
        form.append('amount', amount)
        form.append('image', image)
        const res = await fetch(this.baseUrl + '/caps/add', {
            method: 'POST',
            body: form
        })
        if(!res.ok) {
            throw Error('could not add cap')
        }
    }

    addProduct = async ({name, price, amount, description, address, image}) => {
        const form = new FormData()
        form.append('name', name)
        form.append('price', price)
        form.append('amount', amount)
        form.append('image', image)
        form.append('address', address)
        form.append('description', description)
        const res = await fetch(this.baseUrl + '/admin/addproduct', {
            method: 'POST',
            body: form
        })
        if(!res.ok) {
            throw Error('could not add product')
        }
    }

    getStory = async () => {
        const res = await fetch(this.baseUrl + '/admin/story')
        if(!res.ok) {
            throw Error('could not get story')
        }
        return await res.json()
    }
    
    getAllCaps = async () => {
       const res = await fetch(this.baseUrl + '/caps/')
       if(!res.ok) {
           throw Error('could not get the caps')
       }
       return await res.json()
    }

    getMyCaps = async (username) => {
        let form = new FormData()
        form.append('username', username)
        const res = await fetch(this.baseUrl + '/caps/fetch', {
            method: 'POST',
            body: form
        })
        if (!res.ok) {
            throw Error('could not get caps')
        }
        return await res.json()
    }
    
    checkCapCode = async (username, capcode) => {
        let form = new FormData()
        form.append('username', username)
        form.append('capCode', capcode)
        const res = await fetch(this.baseUrl + '/caps/collect', {
            method: 'POST',
            body: form
        })
        return await res.json()
    }

    getUserBalance = async (username) => {
        let form = new FormData()
        form.append('username', username)
        const res = await fetch(this.baseUrl + '/caps/balance', {
            method: 'POST',
            body: form
        })
        if (!res.ok) {
            throw Error('could not get cap balance')
        }
        return await res.json()
    }

    getMyProducts = async (username) => {
        let form = new FormData()
        form.append('username', username)
        const res = await fetch(this.baseUrl + '/shop/fetch', {
            method: 'POST',
            body: form
        })
        if (!res.ok) {
            throw Error('could not get user products')
        }
        return await res.json()
    }

    getAllProducts = async () => {
        const res = await fetch(this.baseUrl + '/shop/')
        if(!res.ok) {
            throw Error('could not get all prods')
        }
        return await res.json()
    }

    addNews = async (result) => {
        const form = new FormData()
        form.append('content', JSON.stringify(result))
        const res = await fetch(this.baseUrl + '/admin/add', {
            method: 'POST',
            body: form
        })
        if(!res.ok) {
            throw Error('could not post news')
        }
        return await res.json()
    }

    getNews = async (id) => {
        const res = await fetch(this.baseUrl + '/news/' + id)
        if(!res.ok) {
            throw Error('could not get news')
        }
        return await res.json()
    }
    
    getAllNews = async (result) => {
        const res = await fetch(this.baseUrl + '/news/')
        if(!res.ok) {
            throw Error('could not get all news')
        }
        return await res.json()
    }

    buyProduct = async (username, id) => {
        let form = new FormData()
        form.append('username', username)
        form.append('productid', id)
        const res = await fetch(this.baseUrl + '/shop/buy', {
            method: 'POST',
            body: form
        })
        if (!res.ok) {
            throw Error('could not get purchase')
        }
        return await res.json()
    }
    
}