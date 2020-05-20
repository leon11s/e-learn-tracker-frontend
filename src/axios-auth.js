import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://192.168.56.101:8000/elearntracker/api/v1'
})

instance.defaults.headers.common['Content-Type'] = 'application/json'

export default instance