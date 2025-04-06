import { useEffect, useState } from 'react'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

const PROTO_PATH = '/proto/health.proto'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    })

    const proto = grpc.loadPackageDefinition(packageDefinition)
    const client = new proto.health.HealthService(
      'backend:50051',
      grpc.credentials.createInsecure()
    )

    client.GetHealthStatus({ name: 'World' }, (err: any, response: any) => {
      if (err) {
        console.error(err)
        setMessage('Error connecting to server')
        return
      }
      setMessage(response.message)
    })
  }, [])

  return (
    <div>
      <h1>Health Status</h1>
      <p>{message}</p>
    </div>
  )
}

export default App 