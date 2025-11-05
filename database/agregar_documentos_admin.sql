-- Agregar columna para archivos adjuntos del administrador
ALTER TABLE tramites 
ADD COLUMN documentos_admin LONGTEXT COMMENT 'Archivos adjuntos subidos por el administrador en formato JSON';
