"""
Test rápido del endpoint de exportación
"""
import requests

# Primero hacer login
login_data = {
    'dni': '12345678',
    'password': 'Admin2024!'
}

print("🔐 Haciendo login...")
response = requests.post('http://localhost:5000/api/auth/login', json=login_data)
if response.status_code == 200:
    token = response.json()['access_token']
    print(f"✅ Login exitoso. Token: {token[:20]}...")
    
    # Obtener trámites
    headers = {'Authorization': f'Bearer {token}'}
    print("\n📋 Obteniendo trámites...")
    tramites_response = requests.get('http://localhost:5000/api/tramites/mis-tramites', headers=headers)
    
    if tramites_response.status_code == 200:
        tramites = tramites_response.json()['tramites']
        if tramites:
            tramite_id = tramites[0]['id']
            print(f"✅ Encontrado trámite ID: {tramite_id}")
            
            # Probar exportación PDF
            print(f"\n📄 Exportando trámite {tramite_id} a PDF...")
            pdf_response = requests.get(
                f'http://localhost:5000/api/tramites/{tramite_id}/exportar/pdf',
                headers=headers
            )
            
            if pdf_response.status_code == 200:
                print(f"✅ PDF generado: {len(pdf_response.content)} bytes")
                with open(f'test_tramite_{tramite_id}.pdf', 'wb') as f:
                    f.write(pdf_response.content)
                print(f"✅ Guardado como: test_tramite_{tramite_id}.pdf")
            else:
                print(f"❌ Error PDF: {pdf_response.status_code}")
                print(pdf_response.text)
            
            # Probar exportación DOCX
            print(f"\n📝 Exportando trámite {tramite_id} a DOCX...")
            docx_response = requests.get(
                f'http://localhost:5000/api/tramites/{tramite_id}/exportar/docx',
                headers=headers
            )
            
            if docx_response.status_code == 200:
                print(f"✅ DOCX generado: {len(docx_response.content)} bytes")
                with open(f'test_tramite_{tramite_id}.docx', 'wb') as f:
                    f.write(docx_response.content)
                print(f"✅ Guardado como: test_tramite_{tramite_id}.docx")
            else:
                print(f"❌ Error DOCX: {docx_response.status_code}")
                print(docx_response.text)
        else:
            print("⚠️ No hay trámites para exportar")
    else:
        print(f"❌ Error obteniendo trámites: {tramites_response.status_code}")
else:
    print(f"❌ Error en login: {response.status_code}")
    print(response.text)
