export interface IdentifierQuery {
  data: IdentifierData
  mensaje: string
}

export interface IdentifierData {
  choice: string
  direction: string
  email: string
  genre: string
  phone: string
  preference: Preference
  rut: string
  username: string
  uuid: string
  password: string
}

interface Preference {
  email: boolean
  telefono: boolean
  whatsapp: boolean
}
