'use client';

import StoreProvider from "@bienal/app/StoreProvider";
import { Sculpture } from "@bienal/app/types/scultureType";
import Navbar from "@bienal/app/ui/components/Navbar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { gql } from "@apollo/client";
import { apolloClient } from "@bienal/app/config/apollo-client";
import ApolloProviderWrapper from "@bienal/app/ui/components/apollo-component";
import { VoteModal } from "../../eventos/components/VoteModal";

interface Props {
  params: {
    uuid: string;
  };
}

const VALIDATE_QR_CODE = gql`
  query ValidateQRCode($id: String!) {
    validateQRCode(id: $id)
  }
`;

export default function Page({ params }: Props) {
  const { uuid } = params;

  const [sculpture, setSculpture] = useState<Sculpture | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [qrValid, setQrValid] = useState(false);
  const [reFetch, setReFetch] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(true)


 
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleReFetch = () => {
    setReFetch(!reFetch)
  }

  const handleModal = () =>{
    setOpenModal(!openModal)
  }

  // Fetch de los datos de la escultura
  const fetchSculpture = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}sculpture/detail/${uuid}`,
        { cache: "no-store" }
      );

      if (res.status === 200) {
        const data = await res.json();
        setSculpture(data.payload);
      } else {
        setSculpture(null);
      }
    } catch (error) {
      setSculpture(null);
    } finally {
      setLoading(false);
    }
  };

  const validateQRCode = async (qrId: string): Promise<boolean> => {
    try {
      const { data } = await apolloClient.query({
        query: VALIDATE_QR_CODE,
        variables: { id: qrId },
      });
      return data.validateQRCode; // Retorna true o false del backend
    } catch (error) {
      console.error("Error validando QR:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchSculpture();

    const qrId = searchParams.get("qrId"); // Leer el QR ID de la URL
    const showVote = searchParams.get("showVoteModal") === "true";

    if (showVote && qrId) {
      validateQRCode(qrId).then((isValid) => {
        if (isValid) {
          setShowVoteModal(true); // Muestra el modal si es válido
          setQrValid(true);
        } else {
          alert("El código QR ha expirado.");
          router.push(`/sculpture/${uuid}`); // Redirige sin parámetros
        }
      });
    }
  }, [searchParams, uuid, router]);

  const closeModal = () => {
    setShowVoteModal(false);

    // Eliminar los parámetros de la URL al cerrar el modal
    const url = new URL(window.location.href);
    url.searchParams.delete("showVoteModal");
    url.searchParams.delete("qrId");
    router.push(url.pathname);
  };

  if (loading) {
    return (
      <main className="flex w-full justify-center items-center h-screen">
        <p className="text-xl">Cargando...</p>
      </main>
    );
  }

  if (!sculpture) {
    return (
      <>
        <ApolloProviderWrapper>
          <StoreProvider>
            <Navbar />
          </StoreProvider>
          <main className="flex w-full justify-center items-center h-screen">
            <p className="text-2xl text-red-600">Error: Escultura no encontrada</p>
          </main>
        </ApolloProviderWrapper>
      </>
    );
  }

  return (
    <>
      <ApolloProviderWrapper>
        <StoreProvider>
          <Navbar />
        </StoreProvider>

        <main className="bg-gray-100 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link
              href="/sculptures"
              className="inline-flex items-center text-emerald-800 hover:text-emerald-600 mb-6"
            >
              <ChevronLeft className="mr-2" />
              Volver a la lista de esculturas
            </Link>

            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-96 w-full object-cover md:w-96"
                    src={sculpture.images[0]?.url}
                    alt={sculpture.name}
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-emerald-500 font-semibold">
                    {sculpture.event}
                  </div>
                  <h1 className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    {sculpture.name}
                  </h1>
                  <p className="mt-2 text-xl text-gray-500">
                    por {sculpture.sculptor.name} {sculpture.sculptor.lastname}
                  </p>
                  <p className="mt-4 text-gray-500">
                    Creado el:{" "}
                    {new Date(sculpture.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="px-8 py-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Descripción
                </h2>
                <p className="text-gray-600 text-lg">{sculpture.description}</p>
              </div>

              <div className="px-8 py-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Galería de Imágenes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {sculpture.images.map((image, index) => (
                    <img
                      key={image.id}
                      src={image.url}
                      alt={`${sculpture.name} - Imagen ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>

              { openModal && showVoteModal && qrValid && (
                 
                  <StoreProvider>
                    <VoteModal reFetch={handleReFetch} closeModal={handleModal} sculptureId={sculpture.id} sculptureName={sculpture.name}/>
                  </StoreProvider>
                
              )}
            </div>
          </div>
        </main>
      </ApolloProviderWrapper>
    </>
  );
}
