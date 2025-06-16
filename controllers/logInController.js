import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { buscarUsuario } from './tuServicioDeUsuarios.js'  // o donde tengas tu función

// Asegúrate de tener en tu .env una variable:
//   JWT_SECRET=unaClaveMuySecreta
// y de cargarla con dotenv si usas CommonJS:
//   require('dotenv').config()
// o con ESModules:
//   import 'dotenv/config'

export const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: "Falta ingresar email o password" })
  }

  const user = await buscarUsuario(email)
  if (!user) {
    return res.status(401).json({ error: "Usuario y/o password incorrectos" })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(401).json({ error: "Usuario y/o password incorrectos" })
  }

  const payload = {
    sub: user.id,       
    email: user.email,  
  }

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  )

  return res.status(200).json({ token })
}