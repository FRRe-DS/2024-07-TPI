"use client"

import Button from "@bienal/app/ui/components/Button";
import Input from "@bienal/app/ui/components/Input";
import { useEffect, useState } from "react";
import VisualPasswodIcon from "@bienal/app/ui/components/VisualPasswordIcon";
import { AppDispatch, RootState } from "@bienal/store/store";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, removeError } from "@bienal/store/slices/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
  const error = useSelector((state: RootState) => state.user.error)
  const user = useSelector((state: RootState) => state.user.user)
  const router = useRouter();

  useEffect(()=>{
    if(user){
      router.push("/")
    }

    
  })

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        dispatch(removeError());
      }, 8000);
  
      return () => clearTimeout(timeout);
    }
  }, [error])

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch: AppDispatch = useDispatch();


  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({email, password}));
  }

  return (
    
    <main className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Iniciar sesión</h2>
              <p className="text-sm text-gray-600 mt-1">
                Ingresa tus credenciales para acceder a tu cuenta
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
                      placeholder="••••••••"
                      additionalElement={VisualPasswodIcon} // Pasando el componente adicional
                      showPassword={showPassword} // Pasando el estado
                      togglePasswordVisibility={togglePasswordVisibility}
                      
                  />
                </div>
              </div>
              
              <div>
                <Button text="Iniciar Sesion"/>
              </div>
            </form>
            <p className="text-sm text-gray-600 mt-1 flex justify-center">
              ¿No tenes una cuenta?  
              <Link href="/auth/register">
                <strong className="mx-1 text-emerald-800">
                  
                  Registrate
                </strong>
              </Link>
            </p>
          </div>
        </div>
        {
          error &&
          <p className="text-sm text-red-600 flex justify-center mt-4">
            {error} 
            
          </p>
        }
    </main>
    
  );
}