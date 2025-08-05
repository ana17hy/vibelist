# 🎵 Instrucciones para agregar tu música a vibelist

## 📁 Estructura de archivos

```
vibelist/
├── public/
│   └── music/
│       ├── covers/          # Imágenes JPEG de portadas
│       │   ├── queen.jpg
│       │   ├── eagles.jpg
│       │   └── ...
│       ├── bohemian-rhapsody.mp3
│       ├── hotel-california.mp3
│       └── ...
```

## 🎵 Cómo agregar tus canciones

### Paso 1: Preparar archivos
1. **MP3:** Coloca tus archivos MP3 en `public/music/`
2. **JPEG:** Coloca las portadas en `public/music/covers/`

### Paso 2: Actualizar el código
Edita el archivo `src/components/MusicPage.js` y actualiza el array `sampleSongs`:

```javascript
const sampleSongs = [
  {
    id: 1,
    title: "Nombre de tu canción",
    artist: "Nombre del artista",
    cover: "/music/covers/tu-imagen.jpg",
    audioUrl: "/music/tu-cancion.mp3"
  },
  // ... más canciones
];
```

## 🎥 Opción 2: Links de YouTube

Si prefieres usar YouTube, puedes usar URLs directas:

```javascript
const sampleSongs = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    cover: "/music/covers/queen.jpg",
    audioUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ"
  }
];
```

## 📝 Ejemplo completo

```javascript
const sampleSongs = [
  {
    id: 1,
    title: "Mi Canción Favorita",
    artist: "Mi Artista Favorito",
    cover: "/music/covers/mi-artista.jpg",
    audioUrl: "/music/mi-cancion.mp3"
  },
  {
    id: 2,
    title: "Otra Canción",
    artist: "Otro Artista",
    cover: "/music/covers/otro-artista.jpg",
    audioUrl: "https://www.youtube.com/watch?v=VIDEO_ID"
  }
];
```

## ⚠️ Notas importantes

- **MP3:** Funciona perfectamente con archivos locales
- **YouTube:** Algunos navegadores pueden bloquear la reproducción automática
- **Imágenes:** Usa formato JPEG o PNG, tamaño recomendado: 300x300px
- **Nombres:** Usa nombres sin espacios (usa guiones: `mi-cancion.mp3`)

## 🚀 Después de agregar archivos

1. Guarda los cambios en `MusicPage.js`
2. La aplicación se recargará automáticamente
3. ¡Disfruta de tu música personalizada! 