# Nothea - Asisten AI Cerdas dan Elegan

Nothea adalah asisten AI cerdas dan elegan yang dapat membantu Anda dengan berbagai tugas, memberikan respons yang cepat, akurat, dan berbobot. Dibuat dengan menggabungkan kekuatan beberapa model AI terkemuka, Nothea menawarkan pengalaman chatting dan analisis yang luar biasa.

## Fitur Utama

- **Chat Interaktif**: Berdiskusi dengan AI yang memiliki pengetahuan luas dan kepribadian menarik
- **Analisis File**: Unggah dan analisis dokumen teks atau PDF
- **Ensemble AI**: Menggabungkan respons dari berbagai model AI untuk hasil terbaik
- **UI Responsif**: Antarmuka elegan yang berfungsi di berbagai perangkat
- **Karakter Interaktif**: Tampilan karakter 8-bit yang memberikan fakta menarik dan bantuan

## Teknologi

Proyek ini dibangun menggunakan:

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Model AI**: 
  - Google Gemini 1.5 Flash
  - Groq Llama 3.3 70B
- **Pustaka Utama**: 
  - `google.generativeai`
  - `groq`
  - `sklearn` untuk pemrosesan teks
  - `PyPDF2` untuk analisis dokumen

## Instalasi

### Prasyarat

- Python 3.8+
- Pip

### Langkah Instalasi

1. **Clone repositori**
   ```
   git clone https://github.com/yourusername/nothea-ai.git
   cd nothea-ai
   ```

2. **Buat dan aktifkan virtual environment**
   ```
   python -m venv venv
   source venv/bin/activate  # Di Windows: venv\Scripts\activate
   ```

3. **Pasang dependensi**
   ```
   pip install -r requirements.txt
   ```

4. **Buat file .env**
   Buat file `.env` di direktori utama dengan API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   GROQ_API_KEY=your_groq_api_key
   GROQ_MODEL_NAME=llama-3.3-70b-versatile
   SECRET_KEY=your_secret_key
   ```

5. **Jalankan aplikasi**
   ```
   python app.py  # Untuk development
   ```

6. **Buka di browser**
   Akses `http://localhost:5000` di browser Anda

## Deployment Produksi

Untuk deployment produksi, sangat disarankan menggunakan web server WSGI seperti Gunicorn:

1. **Instal Gunicorn**
   ```
   pip install gunicorn
   ```

2. **Jalankan dengan Gunicorn**
   ```
   gunicorn -w 4 -b 0.0.0.0:5000 "app:app" --timeout 120
   ```
   
   * `-w 4`: Jumlah worker (disarankan 2x jumlah CPU + 1)
   * `--timeout 120`: Timeout 120 detik untuk respons model AI yang lambat

3. **Menggunakan Nginx sebagai reverse proxy (disarankan)**
   ```
   # Contoh konfigurasi Nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

4. **Variabel Lingkungan Produksi**
   ```
   DEBUG=False
   HOST=127.0.0.1  # Gunakan 127.0.0.1 jika ada Nginx sebagai reverse proxy
   PORT=5000
   DAILY_LIMIT=200
   HOURLY_LIMIT=50
   MINUTE_LIMIT=5
   ```

## Penggunaan

### Chat dengan Nothea

1. Ketik pesan Anda di kotak input
2. Sesuaikan pengaturan model di panel atas (Combined, Gemini, atau Groq)
3. Nikmati respons cerdas dan informatif

### Analisis File

1. Klik ikon paperclip untuk mengunggah file
2. Pilih file teks atau PDF (max 10MB)
3. Tunggu analisis komprehensif dari Nothea

### Kustomisasi

Klik ikon pengaturan untuk mengakses opsi:
- Tema warna
- Panjang respons
- Tingkat kreativitas
- Opsi text-to-speech

## Pengembangan

### Struktur Proyek

- `app.py` - Aplikasi Flask dan routes
- `main.py` - Implementasi model AI dan chatbot
- `file_processor.py` - Modul pemrosesan file
- `templates/` - File HTML
- `static/` - Aset frontend (CSS, JavaScript)

### Optimasi Performa

Aplikasi ini mengimplementasikan beberapa optimasi performa:
- **Kompresi Gzip** - Mengurangi ukuran respons
- **Caching Respons** - Mengurangi panggilan API yang berlebihan
- **Log Rotation** - Mencegah file log terlalu besar
- **Sanitasi Input** - Membatasi ukuran input untuk mencegah abuse

### Menjalankan Test

```
pytest tests/
```

## Lisensi

[Sesuaikan berdasarkan lisensi proyek]

## Tim

- [Nama Pengembang 1]
- [Nama Pengembang 2]

## Kontribusi

Kontribusi sangat dihargai! Untuk berkontribusi:

1. Fork repositori
2. Buat cabang fitur
3. Ajukan pull request

## Kontak

[Informasi kontak tim pengembang] 