import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate, Link, useSearchParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Filter, Search, Eye, MessageSquare, 
  FileText, Clock, User, Calendar, LogOut
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function AdminTramites() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [tramites, setTramites] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroEstado, setFiltroEstado] = useState(searchParams.get('estado') || '')
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [tramiteSeleccionado, setTramiteSeleccionado] = useState(null)
  const [showModal, setShowModal] = useState(false)

  //Estados para responder
  const [nuevoEstado, setNuevoEstado] = useState('')
  const [respuesta, setRespuesta] = useState('')
  const [loadingRespuesta, setLoadingRespuesta] = useState(false)

  // Redirigir si no es administrador
  if (user && user.tipo_usuario !== 'administrador') {
    return <Navigate to="/dashboard" replace />
  }

  useEffect(() => {
    cargarTramites()
  }, [filtroEstado, filtroCategoria])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const cargarTramites = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filtroEstado) params.append('estado', filtroEstado)
      if (filtroCategoria) params.append('categoria', filtroCategoria)

      const response = await axios.get(`/api/admin/tramites?${params}`)
      setTramites(response.data.tramites)
    } catch (error) {
      toast.error('Error al cargar trámites')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const abrirModal = (tramite) => {
    setTramiteSeleccionado(tramite)
    setNuevoEstado(tramite.estado)
    setRespuesta(tramite.respuesta_admin || '')
    setShowModal(true)
  }

  const cerrarModal = () => {
    setShowModal(false)
    setTramiteSeleccionado(null)
    setNuevoEstado('')
    setRespuesta('')
  }

  const handleResponder = async (e) => {
    e.preventDefault()
    
    if (!nuevoEstado) {
      toast.error('Selecciona un estado')
      return
    }

    try {
      setLoadingRespuesta(true)
      await axios.post(`/api/admin/tramites/${tramiteSeleccionado.id}/responder`, {
        estado: nuevoEstado,
        respuesta: respuesta
      })

      toast.success('Trámite actualizado exitosamente')
      cerrarModal()
      cargarTramites()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error al actualizar trámite')
    } finally {
      setLoadingRespuesta(false)
    }
  }

  const getEstadoBadge = (estado) => {
    const estilos = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      en_revision: 'bg-blue-100 text-blue-800',
      observado: 'bg-orange-100 text-orange-800',
      aprobado: 'bg-green-100 text-green-800',
      rechazado: 'bg-red-100 text-red-800',
      completado: 'bg-gray-100 text-gray-800'
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${estilos[estado] || 'bg-gray-100 text-gray-800'}`}>
        {estado.replace('_', ' ').toUpperCase()}
      </span>
    )
  }

  const tramitesFiltrados = tramites.filter(tramite => {
    const cumpleBusqueda = busqueda === '' || 
      tramite.codigo_tramite.toLowerCase().includes(busqueda.toLowerCase()) ||
      tramite.usuario_dni.includes(busqueda) ||
      tramite.usuario_nombre.toLowerCase().includes(busqueda.toLowerCase())
    
    return cumpleBusqueda
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Gestión de Trámites
                </h1>
                <p className="text-gray-600 mt-1">
                  {tramitesFiltrados.length} trámite(s) encontrado(s)
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-1" />
                Buscar
              </label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Código, DNI o nombre..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filtro Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Estado
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_revision">En Revisión</option>
                <option value="observado">Observado</option>
                <option value="aprobado">Aprobado</option>
                <option value="rechazado">Rechazado</option>
                <option value="completado">Completado</option>
              </select>
            </div>

            {/* Filtro Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Categoría
              </label>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Todas</option>
                <option value="impuestos_pagos">Impuestos y Pagos</option>
                <option value="catastro_propiedad">Catastro y Propiedad</option>
                <option value="licencias">Licencias</option>
                <option value="obras_construccion">Obras y Construcción</option>
                <option value="quejas_denuncias">Quejas y Denuncias</option>
                <option value="registro_civil">Registro Civil</option>
                <option value="transporte_transito">Transporte y Tránsito</option>
                <option value="servicios_municipales">Servicios Municipales</option>
                <option value="atencion_ciudadano">Atención al Ciudadano</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de Trámites */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando trámites...</p>
          </div>
        ) : tramitesFiltrados.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron trámites</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ciudadano</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo de Trámite</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioridad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tramitesFiltrados.map((tramite) => (
                    <tr key={tramite.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{tramite.codigo_tramite}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{tramite.usuario_nombre}</div>
                            <div className="text-sm text-gray-500">DNI: {tramite.usuario_dni}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{tramite.tipo_nombre}</div>
                        <div className="text-xs text-gray-500">{tramite.tipo_categoria}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(tramite.fecha_solicitud).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getEstadoBadge(tramite.estado)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${
                            tramite.prioridad >= 8 ? 'bg-red-500' :
                            tramite.prioridad >= 5 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <span className="text-sm font-medium">{tramite.prioridad}/10</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => abrirModal(tramite)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm flex items-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Responder
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Respuesta */}
      {showModal && tramiteSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Responder Trámite</h2>
              <p className="text-gray-600 mt-1">{tramiteSeleccionado.codigo_tramite}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Info del Trámite */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Ciudadano:</span>
                    <p className="text-gray-900">{tramiteSeleccionado.usuario_nombre}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">DNI:</span>
                    <p className="text-gray-900">{tramiteSeleccionado.usuario_dni}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Email:</span>
                    <p className="text-gray-900">{tramiteSeleccionado.usuario_email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Teléfono:</span>
                    <p className="text-gray-900">{tramiteSeleccionado.usuario_telefono}</p>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Tipo de Trámite:</span>
                  <p className="text-gray-900">{tramiteSeleccionado.tipo_nombre}</p>
                </div>
                {tramiteSeleccionado.descripcion && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Descripción del Ciudadano:</span>
                    <p className="text-gray-900 mt-1">{tramiteSeleccionado.descripcion}</p>
                  </div>
                )}
              </div>

              {/* Formulario */}
              <form onSubmit={handleResponder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nuevo Estado *
                  </label>
                  <select
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en_revision">En Revisión</option>
                    <option value="observado">Observado (requiere correcciones)</option>
                    <option value="aprobado">Aprobado</option>
                    <option value="rechazado">Rechazado</option>
                    <option value="completado">Completado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Respuesta/Observaciones
                  </label>
                  <textarea
                    value={respuesta}
                    onChange={(e) => setRespuesta(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Escribe tu respuesta o comentarios para el ciudadano..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Esta respuesta será visible para el ciudadano y se enviará una notificación.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loadingRespuesta}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50"
                  >
                    {loadingRespuesta ? 'Actualizando...' : 'Guardar y Notificar'}
                  </button>
                  <button
                    type="button"
                    onClick={cerrarModal}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
