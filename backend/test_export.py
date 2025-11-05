"""
Script de prueba para exportación
"""
import sys
print("Python path:", sys.path)

try:
    from exportar_tramites import generar_docx, generar_pdf
    print("✅ Módulo importado correctamente")
    
    # Datos de prueba
    tramite_test = {
        'codigo_tramite': 'TEST-2024-1234',
        'tipo_nombre': 'Licencia de Prueba',
        'estado': 'aprobado',
        'fecha_solicitud': '2024-11-05',
        'prioridad': 8,
        'descripcion': '**Solicitud de prueba**\n\nEsto es una prueba.\n\n1. Item 1\n2. Item 2',
        'respuesta_admin': 'Aprobado correctamente',
        'requisitos': 'DNI\nCertificado\nPago'
    }
    
    usuario_test = {
        'dni': '12345678',
        'nombres': 'Juan',
        'apellidos': 'Pérez',
        'email': 'juan@test.com',
        'telefono': '987654321',
        'direccion': 'Av. Test 123'
    }
    
    print("\n📄 Generando DOCX...")
    docx_buffer = generar_docx(tramite_test, usuario_test)
    print(f"✅ DOCX generado: {len(docx_buffer.getvalue())} bytes")
    
    print("\n📄 Generando PDF...")
    pdf_buffer = generar_pdf(tramite_test, usuario_test)
    print(f"✅ PDF generado: {len(pdf_buffer.getvalue())} bytes")
    
    print("\n🎉 TODO FUNCIONA CORRECTAMENTE")
    
except ImportError as e:
    print(f"❌ Error de importación: {e}")
    print("\nInstalando librerías...")
    import subprocess
    subprocess.run([sys.executable, "-m", "pip", "install", "python-docx", "reportlab", "markdown"])
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
