import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader' // Importa el spinner que desees utilizar
import { useMutation, useQuery } from '@tanstack/react-query'

import { Alert, Button, TextField } from '@/components/ui-react-aria'
import { useAuthentication } from '@/hooks/AuthProvider'

import { IdentifierData, IdentifierQuery } from './types'

interface RegisterTypes {
  email: string
  password: string
  id: string
  username: string
}

export default function Register() {
  const navigate = useNavigate()
  const { uuid } = useParams()
  const { login, loggedOut } = useAuthentication()
  const [failed, setFailed] = useState<string | null>()
  const [success, setSuccess] = useState<string | null>()
  const [password, setPassword] = useState('')

  const {
    register,
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = useForm<IdentifierData>()

  const {
    data: responseData,
    error,
    isLoading,
  } = useQuery<IdentifierQuery>({
    queryKey: ['obtenerUsuario', { uuid }],
    queryFn: async () => {
      const response = await fetch(
        `https://stickerseller-backend-cb0779d78440.herokuapp.com/obtener/${uuid}`
      )
      if (!response.ok) throw new Error('Respuesta del servidor no fue exitosa')
      return response.json()
    },
    enabled: !!uuid, // Asegura que la consulta solo se ejecuta si uuid está definido
  })

  // const choiced = responseData?.data.choice
  // console.log(choiced)

  const createKey = useMutation({
    mutationKey: ['createKey'],
    mutationFn: async (dataToSubmit: RegisterTypes) => {
      // Ajusta esto según necesites enviar IdentifierQuery o IdentifierData
      const response = await fetch(
        'https://stickerseller-backend-cb0779d78440.herokuapp.com/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSubmit), // Asegúrate de ajustar la estructura según lo espera tu backend
        }
      )

      if (!response.ok) throw new Error('Respuesta del servidor no fue exitosa')
      return response.json()
    },
    onSuccess: (dataToSubmit) => {
      // Aquí manejas el éxito de la mutación
      console.log('Registro exitoso:', dataToSubmit)
      setTimeout(() => {
        navigate('/dashboard') // Asumiendo que deseas redirigir a '/home'
      }, 2000) // 2000 milisegundos = 2 segundos
    },
    onError: (error) => {
      // Aquí manejas el error de la mutación
      console.error('Error en el registro:', error)
    },
  })

  const handleRegister = () => {
    setFailed(null) // Resetea el estado de error antes de la operación

    if (!responseData?.data) {
      // Maneja el caso en que responseData no está disponible
      setFailed('No se pudo obtener los datos del usuario para el registro.')
      return
    }

    const dataToSubmit = {
      id: responseData.data.uuid, // Usa la propiedad correcta para 'id' si es diferente
      username: responseData.data.username,
      email: responseData.data.email,
      password: password, // Usa el estado 'password'
    }

    createKey.mutate(dataToSubmit)

    setSuccess('Contraseña creada con exito espera te redigiremos automaticamente ')
  }

  return (
    <main className='mx-auto w-full max-w-md p-6'>
      {failed && <Alert variant='destructive'>{failed}</Alert>}
      {success && <Alert variant='success'>{success}</Alert>}
      {/* Resto del componente */}
      {!isLoading ? (
        <>
          {' '}
          <div className='mb-5'>Ingresa tu constraseña para continuar el proceso de registro:</div>
          <form autoComplete='off' onSubmit={handleSubmit(handleRegister)}>
            <div className='grid gap-y-4'>
              {/* <TextField
            label='Email'

            // Añade manejo de errores si es necesario
          /> */}
              <TextField
                label='Contraseña'
                type='password'
                value={password}
                onChange={setPassword}
              />
            </div>
            <Button className={'mt-5 hover:cursor-pointer'} type='submit' variant='primary'>
              Registrate
            </Button>
          </form>
        </>
      ) : (
        <div className='flex h-screen items-center justify-center'>
          <div>
            <ClipLoader loading={isLoading} size={150} />
            <p>Validando usuario...</p>
          </div>
        </div>
      )}

      {/* Más del componente */}
    </main>
  )
}
