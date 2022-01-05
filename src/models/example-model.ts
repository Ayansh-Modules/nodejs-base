import { Schema, model } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
interface Example {
  name: string
  username: string
  email: string
  avatar?: string
  hash: string
  salt: string
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<Example>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: false },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
})

// 3. Create a Model.
const ExampleModel = model<Example>('Example', schema)

export default ExampleModel
