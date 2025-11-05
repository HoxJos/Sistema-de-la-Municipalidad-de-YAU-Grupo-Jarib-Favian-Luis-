"""
Test ultra simple para ver qué falla
"""
import sys
import traceback

try:
    print("1. Importando librerías base...")
    from datetime import datetime
    import io
    print("✅ datetime e io OK")
    
    print("\n2. Importando docx...")
    from docx import Document
    from docx.shared import Pt
    print("✅ docx OK")
    
    print("\n3. Importando reportlab...")
    from reportlab.lib.pagesizes import letter
    from reportlab.platypus import SimpleDocTemplate
    print("✅ reportlab OK")
    
    print("\n4. Importando módulo exportar_tramites...")
    from exportar_tramites import generar_docx, generar_pdf
    print("✅ exportar_tramites OK")
    
    print("\n5. Creando datos de prueba...")
    tramite = {
        'codigo_tramite': 'TEST-001',
        'tipo_nombre': 'Test',
        'estado': 'pendiente',
        'fecha_solicitud': '2024-11-05',
        'prioridad': 5,
        'descripcion': 'Test',
        'respuesta_admin': None,
        'requisitos': None
    }
    
    usuario = {
        'dni': '12345678',
        'nombres': 'Test',
        'apellidos': 'Usuario',
        'email': 'test@test.com',
        'telefono': '999999999',
        'direccion': 'Test 123'
    }
    print("✅ Datos OK")
    
    print("\n6. Generando DOCX...")
    docx_buf = generar_docx(tramite, usuario)
    print(f"✅ DOCX generado: {len(docx_buf.getvalue())} bytes")
    
    print("\n7. Generando PDF...")
    pdf_buf = generar_pdf(tramite, usuario)
    print(f"✅ PDF generado: {len(pdf_buf.getvalue())} bytes")
    
    print("\n🎉 TODO FUNCIONA PERFECTAMENTE\n")
    print("El problema NO está en el módulo de exportación.")
    print("Debe ser en el endpoint o en el frontend.")
    
except Exception as e:
    print(f"\n❌ ERROR: {e}")
    print("\nTraceback completo:")
    traceback.print_exc()
