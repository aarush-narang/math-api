const { v1: uuidv1, v3: uuidv3, v4: uuidv4, v5: uuidv5, validate } = require('uuid')

class UUID {
    constructor(version, name, namespace) {
        this.version = version
        if(version === 3 || version === 5) {
            if (!namespace) namespace = uuidv4()
            if (!validate(namespace)) throw new Error("Please enter a valid namespace (UUID).")
            this.name = name
            this.namespace = namespace
        }
    }
    generateUUID() {
        if (this.version === 4) return uuidv4()
        if (this.version === 1) return uuidv1()
        if (this.version === 3) return uuidv3(this.name, this.namespace)
        if (this.version === 5) return uuidv5(this.name, this.namespace)
        throw new Error("The version you entered is either typed incorrectly, does not exist, or is not supported by this API.")
    }
}

module.exports = {
    UUID
}