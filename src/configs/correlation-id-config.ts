import cls from 'cls-hooked'
import { v4 as uuidv4 } from 'uuid'

const store = cls.createNamespace('correlation-id-namespace')

const CORRELATION_ID_KEY = process.env.CORRELATION_ID_KEY || process.exit(1)

function withId(func: () => void, id: string | undefined) {
    store.run(() => {
        store.set(CORRELATION_ID_KEY, id || uuidv4())
        func()
    })
}

function getId() {
    return store.get(CORRELATION_ID_KEY)
}

const correlator = {
    withId,
    getId,
    bindEmitter: store.bindEmitter.bind(store),
    bind: store.bind.bind(store),
}

export default correlator