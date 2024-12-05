"use client"

import Button from "@bienal/app/ui/components/Button";
import Input from "@bienal/app/ui/components/Input";
import { useEffect, useState } from "react";
import VisualPasswodIcon from "@bienal/app/ui/components/VisualPasswordIcon";
import { AppDispatch, RootState } from "@bienal/store/store";
import { useDispatch, useSelector } from "react-redux";
import { registerDefaultUser } from "@bienal/store/slices/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const user = useSelector((state: RootState) => state.user.user)

  const msg = useSelector((state: RootState) => state.user.msg)
  const error = useSelector((state: RootState) => state.user.error)
  const loading = useSelector((state: RootState) => state.user.loading)


  const router = useRouter();

  useEffect(()=>{
    if(user){
      router.push("/")
    }
  })  

  const [name, setName] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [dni, setDni] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    dispatch(registerDefaultUser({email,phoneNumber:phone,name, password, dni, lastname}));
  }

  return (
    
    <main className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Registrarse</h2>
              <p className="text-sm text-gray-600 mt-1">
                Ingresa tus datos para crear tu cuenta
              </p>
            </div>
            <form className="space-y-6" onSubmit={(e) => {handleSubmit(e)} } method="POST">
              <div>
                <Input
                  label={"Correo electrónico"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@ejemplo.com"
                />
              </div>
              <div className="flex">
                <div className="mr-2">

                  <Input
                    label={"Nombre"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Arjen"
                    />
                </div>
                <div>

                  <Input
                    label={"Apellido"}
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    id="lastname"
                    name="lastname"
                    type="text"
                    required
                    placeholder="Robben"
                    />
                </div>
              </div>
              <div className="flex">

              
              
                <div className="mr-2">
                  <Input
                    label={"DNI sin puntos"}
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="11111111"
                  />
                </div>
                <div>
                  <Input
                    label={"Telefono"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="phone"
                    name="phone"
                    type="number"
                    required
                    placeholder="3624001100"
                  />
                </div>
              </div>
              <div>
                <div className="mt-1 relative">
                  <Input
                      label={"Contraseña"}
                      value={password}
                      id="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      required
                      additionalElement={VisualPasswodIcon} // Pasando el componente adicional
                      showPassword={showPassword} // Pasando el estado
                      togglePasswordVisibility={togglePasswordVisibility}
                      
                  />
                </div>
              </div>
              
              <div>
                <Button text="Crear cuenta"/>
              </div>
            </form>
            <p className="text-sm text-gray-600 mt-1 flex justify-center">
              ¿Ya tenes una cuenta?  
              <Link href="/auth/login">
                <strong className="mx-1 text-emerald-800">
                  
                  Iniciar sesion
                </strong>
              </Link>
            </p>
          </div>
        </div>
        {
          msg && !error &&
          <p className="text-sm text-emerald-800 mt-1 flex justify-center mt-4">
            {msg} 
            <Link href="/auth/login">
              <strong className="mx-1 text-gray-100 bg-emerald-800 rounded-md px-2 py-1">
                
                Iniciar sesion
              </strong>
            </Link>
          </p>
        }
        {
          !msg && error &&
          <p className="text-sm text-red-600 mt-1 flex justify-center mt-4">
            {error} 
            
          </p>
        }

    </main>
    
  );
}