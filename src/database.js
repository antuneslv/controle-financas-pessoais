import mongoose from 'mongoose'
import 'dotenv/config'

const MONGO_URL = process.env.MONGO_URL

const connect = (attempt = 1) => {
  try {
    mongoose.connect(MONGO_URL)
    console.log('\nConnected!')
  } catch (e) {
    console.error('Failed to connect to database', e)
    console.log('Trying to reconnect...')
    setTimeout(() => connect(attempt + 1), 3000 ** attempt)
  }
}

connect()
