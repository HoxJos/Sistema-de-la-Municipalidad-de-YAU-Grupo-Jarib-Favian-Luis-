"""
Script de prueba para verificar conexión y tipos de datos
"""
from database import Database
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_conexion():
    """Probar conexión básica"""
    try:
        if Database.initialize():
            logger.info("✅ Conexión a MySQL exitosa")
            
            # Probar consulta simple
            result = Database.execute_query("SELECT COUNT(*) as count FROM usuarios")
            logger.info(f"✅ Usuarios en BD: {result[0]['count']}")
            
            # Probar con parámetros
            result = Database.execute_query(
                "SELECT * FROM usuarios WHERE activo = %s LIMIT 1", 
                (True,)
            )
            if result:
                logger.info(f"✅ Query con parámetros exitosa: {result[0]['dni']}")
            
            return True
        else:
            logger.error("❌ Error conectando a MySQL")
            return False
    except Exception as e:
        logger.error(f"❌ Error en prueba: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("="*60)
    print("PRUEBA DE CONEXIÓN Y TIPOS DE DATOS")
    print("="*60)
    test_conexion()
