"use client";

import StoreProvider from "@bienal/app/StoreProvider";
import { User } from "@bienal/app/types/usersType";
import Button from "@bienal/app/ui/components/Button";
import Input from "@bienal/app/ui/components/Input";
import Navbar from "@bienal/app/ui/components/Navbar";
import { fetchUserByToken } from "@bienal/store/slices/userSlice";
import { AppDispatch, RootState } from "@bienal/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UserProfile {
    dni: string | null;
    email: string | null;
    lastname: string | null;
    name: string | null;
    phoneNumber: string | null;
    biografia: string | null;
    qr: string | null;
    obrasPrevias: string | null;
}

export default function Page() {
    const initialProf: UserProfile = {
        dni: null,
        email: null,
        lastname: null,
        name: null,
        phoneNumber: null,
        biografia: null,
        qr: null,
        obrasPrevias: null,
    };
    const user: User | null = useSelector((state: RootState) => state.user.user);
    const router = useRouter();
    const dispatch:AppDispatch = useDispatch()
    const [msg, setMsg] = useState<string | null>(null);
    
    useEffect(() => {
        
        setMsg(null);
    }, []);
    
    useEffect(() => {
        if (!user) {
            return router.push("/");
        }
    }, [user, router]);

    const [profile, setProfile] = useState<UserProfile>(initialProf);
    const [errors, setErrors] = useState<Partial<UserProfile>>({});

    const filterProfileData = (data: UserProfile) => {
        const filteredData: Partial<UserProfile> = {};
        Object.entries(data).forEach(([key, value]) => {
            if (value && value.trim() !== "") {
                filteredData[key as keyof UserProfile] = value;
            }
        });
        return filteredData;
    };

    const submitProfileData = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const filteredProfile = filterProfileData(profile); // Filtra los valores válidos
            console.log("Filtered profile:", filteredProfile);

            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}users/edit/${user?.id}`,
                filteredProfile, // Envía solo los valores filtrados
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res);

            if (res.status === 200) {
                setMsg("Perfil editado correctamente");
                
            } else {
                setMsg("Error");
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            setMsg("Error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: Partial<UserProfile> = {};

        if (profile.email && !validateEmail(profile.email)) {
            newErrors.email = "Email inválido";
        }

        if (Object.keys(newErrors).length === 0) {
            await submitProfileData();
            dispatch(fetchUserByToken())
        } else {
            setErrors(newErrors);
        }
        setProfile(initialProf)
    };

    return (
        <>
            <StoreProvider>
                <Navbar />
            </StoreProvider>
            <main className="flex w-full">
                <section className="mt-20 w-full">
                    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Perfil</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Input
                                    label="DNI"
                                    type="text"
                                    id="dni"
                                    name="dni"
                                    value={profile.dni || ""}
                                    onChange={handleChange}
                                    placeholder={user?.dni || ""}
                                />
                            </div>

                            <div>
                                <Input
                                    label="Email"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={profile.email || ""}
                                    onChange={handleChange}
                                    placeholder={user?.email || ""}
                                />
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <Input
                                    label="Apellido"
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    value={profile.lastname || ""}
                                    onChange={handleChange}
                                    placeholder={user?.lastname || ""}
                                />
                            </div>

                            <div>
                                <Input
                                    label="Nombre"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={profile.name || ""}
                                    onChange={handleChange}
                                    placeholder={user?.name || ""}
                                />
                            </div>

                            <div>
                                <Input
                                    label="Número de Teléfono"
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={profile.phoneNumber || ""}
                                    onChange={handleChange}
                                    placeholder={user?.phoneNumber || ""}
                                />
                            </div>
                            {
                                user?.role === "ESCULTOR"
                                &&
                                <>
                                <div>
                                    <label htmlFor="biografia" className="block text-sm font-medium text-gray-700">
                                        Biografía
                                    </label>
                                    <textarea
                                        id="biografia"
                                        name="biografia"
                                        rows={3}
                                        value={profile.biografia || ""}
                                        onChange={handleChange}
                                        placeholder={user?.escultor?.biografia || ""}
                                        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                                        ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="obrasPrevias" className="block text-sm font-medium text-gray-700">
                                        Obras Previas
                                    </label>
                                    <textarea
                                        id="obrasPrevias"
                                        name="obrasPrevias"
                                        rows={3}
                                        value={profile.obrasPrevias || ""}
                                        onChange={handleChange}
                                        placeholder={user?.escultor?.obrasPrevias || ""}
                                        className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                                        ></textarea>
                                </div>
                                </>
                            }

                            <div className="flex justify-end">
                                <Button text="Actualizar perfil" type="submit" />
                            </div>
                            {msg && (
                                <p
                                    className={`${
                                        msg === "Error" ? "text-red-600" : "text-green-600"
                                    } w-full text-center font-semibold text-lg`}
                                >
                                    {msg}
                                </p>
                            )}
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}
