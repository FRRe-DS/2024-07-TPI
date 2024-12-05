'use client';

import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon } from 'lucide-react';

function EditarEscultorModal({
  isOpen,
  onClose,
  escultor,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  escultor: any | null; // Permite que sea null inicialmente
  onSave: (updatedData: any) => void;
}) {
  const [formData, setFormData] = useState({
      name: "",
      lastname: "",
      phoneNumber: "",
      biografia: "",
  });

  useEffect(() => {
      if (escultor) {
          setFormData({
              name: escultor.user.name || "",
              lastname: escultor.user.lastname || "",
              phoneNumber: escultor.user.phoneNumber || "",
              biografia: escultor.biografia || "",
          });
      }
  }, [escultor]); // Se asegura de actualizar cuando cambie `escultor`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
      onSave(formData);
      onClose();
  };

  if (!isOpen || !escultor) return null; // No renderizar si el modal está cerrado o `escultor` es null

  return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Editar Escultor</h2>
              <div className="space-y-4">
                  <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nombre"
                      className="w-full p-2 border rounded"
                  />
                  <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Apellido"
                      className="w-full p-2 border rounded"
                  />
                  <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Teléfono"
                      className="w-full p-2 border rounded"
                  />
                  <textarea
                      name="biografia"
                      value={formData.biografia}
                      onChange={handleChange}
                      placeholder="Biografía"
                      className="w-full p-2 border rounded"
                  />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                  <button
                      onClick={onClose}
                      className="px-4 py-2 bg-gray-400 text-white rounded"
                  >
                      Cancelar
                  </button>
                  <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-emerald-800 text-white rounded"
                  >
                      Guardar
                  </button>
              </div>
          </div>
      </div>
  );
}


function EsculptorPreview({
    escultor,
    isExpanded,
    toggleExpand,
    children,
}: {
    escultor: any;
    isExpanded: boolean;
    toggleExpand: () => void;
    children?: React.ReactNode;
}) {
    return (
        <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
            <div className="p-4 flex justify-between items-center cursor-pointer" onClick={toggleExpand}>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{escultor.user.name} {escultor.user.lastname}</h3>
                    <p className="text-sm text-gray-600">DNI: {escultor.user.dni}</p>
                </div>
                {isExpanded ? <ChevronUpIcon className="h-5 w-5 text-emerald-800" /> : <ChevronDownIcon className="h-5 w-5 text-emerald-800" />}
            </div>
            {isExpanded && (
                <div className="px-4 pb-4">
                    <p><strong>Email:</strong> {escultor.user.email}</p>
                    <p><strong>Teléfono:</strong> {escultor.user.phoneNumber}</p>
                    <p><strong>Biografía:</strong> {escultor.biografia}</p>
                    <div className="mt-4 flex space-x-2">{children}</div>
                </div>
            )}
        </div>
    );
}

export default function VerEscultores() {
  const [escultores, setEscultores] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedEscultor, setSelectedEscultor] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toggleExpand = (dni: string) => {
      setExpandedId(expandedId === dni ? null : dni);
  };

  const handleEditClick = (escultor: any) => {
      setSelectedEscultor(escultor); // Actualiza el escultor seleccionado
      setIsModalOpen(true); // Abre el modal
  };

  const handleSave = async (updatedData: any) => {
    try {
        // Obtener el ID del usuario asociado al escultor
        const userId = selectedEscultor?.user.id;

        if (!userId) {
            throw new Error("No se encontró el ID del usuario");
        }

        const accessToken = localStorage.getItem("accessToken");

        // Enviar solicitud PATCH al servidor
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}sculptor/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                user: {
                    name: updatedData.name,
                    lastname: updatedData.lastname,
                    phoneNumber: updatedData.phoneNumber,
                },
                biografia: updatedData.biografia,
            }),
        });

        if (!response.ok) {
            throw new Error("Error al actualizar el escultor");
        }

        const responseData = await response.json();

        if (responseData.code !== 200) {
            throw new Error("Error inesperado en la respuesta del servidor");
        }

        const updatedSculptor = responseData.payload;

        // Actualizar el estado local con los datos actualizados
        setEscultores((prev) =>
            prev.map((e) =>
                e.user.id === userId ? { ...e, ...updatedSculptor } : e
            )
        );

        setIsModalOpen(false); // Cerrar el modal
    } catch (error) {
        console.error("Error al guardar los datos del escultor:", error);
        alert("No se pudo actualizar el escultor. Por favor, intenta de nuevo.");
    }
};

  useEffect(() => {
      const fetchEscultores = async () => {
          try {
              const accessToken = localStorage.getItem("accessToken");
              const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}sculptor/list`, {
                  headers: {
                      Authorization: `Bearer ${accessToken}`,
                  },
                  cache: "no-store",
              });
              if (!response.ok) {
                  throw new Error("Error al obtener la lista de escultores");
              }
              const data = await response.json();
              setEscultores(data.payload);
          } catch (err) {
              setError("Ocurrió un error desconocido");
          } finally {
              setLoading(false);
          }
      };

      fetchEscultores();
  }, []);

  if (loading) {
      return <div className="text-center text-gray-600">Cargando...</div>;
  }

  if (error) {
      return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
      <div className="min-h-screen bg-white p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Lista de Escultores</h1>
          <EditarEscultorModal
              isOpen={isModalOpen}
              onClose={() => {
                  setIsModalOpen(false);
                  setSelectedEscultor(null); // Limpia el escultor seleccionado al cerrar
              }}
              escultor={selectedEscultor}
              onSave={handleSave}
          />
          {escultores.length === 0 ? (
              <div className="text-center text-gray-600">No hay escultores disponibles.</div>
          ) : (
              <div className="space-y-4">
                  {escultores.map((escultor: any) => (
                      <EsculptorPreview
                          key={escultor.user.dni}
                          escultor={escultor}
                          isExpanded={expandedId === escultor.user.dni}
                          toggleExpand={() => toggleExpand(escultor.user.dni)}
                      >
                          <button
                              className="px-4 py-2 bg-emerald-800 text-white rounded"
                              onClick={() => handleEditClick(escultor)}
                          >
                              Editar
                          </button>
                      </EsculptorPreview>
                  ))}
              </div>
          )}
      </div>
  );
}
