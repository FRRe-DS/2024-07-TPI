"use client";

import { Sculpture } from "@bienal/app/types/scultureType";
import { RootState } from "@bienal/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OwnSculptureCard from "./components/OwnSulpture";
import ApolloProviderWrapper from "@bienal/app/ui/components/apollo-component";

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [esculturas, setEsculturas] = useState<Omit<Sculpture, "sculptor">[]>(
    []
  );
  
  const [reFetch, setReFetch] = useState<boolean>(false)
  const handleReFetch=()=>{
    setReFetch(!reFetch)
  }
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchOwnSculptures = async () => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return router.push("/");
      }
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}sculpture/list-by-sculptor/${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          setEsculturas(res.data.payload);
        } else {
          setEsculturas([]);
        }
      } catch (error) {
        setEsculturas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnSculptures();
  }, [reFetch]);

  if (!user) return router.push("/");

  return (
    <ApolloProviderWrapper>
      {loading ? (
        <p>Cargando esculturas...</p>
      ) : (
        <section className="w-full">
          {esculturas.length > 0 ? (
            <>
              <h1 className="text-center w-full font-bold text-xl">
                Mis esculturas
              </h1>
              <div className="flex flex-row flex-wrap gap-x-12">
                {esculturas.map((sculp, index) => (
                  <OwnSculptureCard reFetchSculptures={handleReFetch} key={index} sculpture={sculp} />
                ))}
              </div>
            </>
          ) : (
            <p>No tienes esculturas por el momento</p>
          )}
        </section>
      )}
    </ApolloProviderWrapper>
  );
}
