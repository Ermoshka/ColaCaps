const baseUrl = "http://localhost:8080"

const uploader = {
    uploadByFile(file) {
        const form = new FormData()
        form.append('image', file)
        return new Promise((resolve, reject) => {
            fetch(baseUrl + '/images', {
                method: 'POST',
                body: form
            }).then(result => {
                // console.log(result)
                return result.json()
            }).then(result => {
                // console.log(result)
                return resolve({
                    success: 1,
                    file: {
                        url: `${baseUrl}/` + result.data
                    }
                })
            })
        }) 
    }
}

export default uploader;