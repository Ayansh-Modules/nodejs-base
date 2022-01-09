import cls from 'cls-hooked'
import { v4 as uuidv4 } from 'uuid'
import Constants from '../constants'
import Configuration from './app-config'

const store = cls.createNamespace(Constants.CORRELATION_ID.NAMESPACE)

function withId(func: () => void, id: string | undefined) {
    store.run(() => {
        store.set(Configuration.app.CORRELATION_ID_KEY, id || uuidv4())
        func()
    })
}

function getId() {
    return store.get(Configuration.app.CORRELATION_ID_KEY)
}

const correlator = {
    withId,
    getId,
    bindEmitter: store.bindEmitter.bind(store),
    bind: store.bind.bind(store),
}

export default correlator