# Vinilo (Catálogo de canciones · React 19)

Catálogo web de canciones y playlists del Tolima: explorar, buscar, publicar, editar, eliminar y marcar favoritas.
Tema alterno al de recetas: entidad `song` con objeto anidado `artist`, listas `credits` y `notes`, categoría `category` (género), `mood` (ánimo) y números `duration` (segundos) y `rating` (1 a 5). **Requiere aprobación del instructor.**

## Instalar y ejecutar
```
npm create vite@latest vinilo   # React + JavaScript
cd vinilo
npm install react-router react-icons react-toastify react-spinners tailwindcss @tailwindcss/vite
npm install -D json-server@beta
```
Copia `src/`, `db.json` y `vite.config.js` sobre el proyecto, agrega en `package.json` el script `"server": "json-server --watch db.json --port 5000"` y ejecuta en dos terminales:
```
npm run server   # API en http://localhost:5000
npm run dev      # app en http://localhost:3000
```

## Requisitos implementados
RF-01 a RF-14 y RT-01, RT-02, RT-03, RT-05, RT-06.

## Decisiones técnicas
- **Favoritas:** campo `favorite` guardado con `PATCH`.
- **RT-01 / RT-02:** `SongForm` usa `<form action>` + `useActionState`; `SubmitButton` usa `useFormStatus`.
- **RT-03:** `FavoriteButton` usa `useOptimistic`.
- **RT-05:** cada página declara su `<title>`.
- **RT-06:** `Input` recibe `ref` como prop y enfoca el primer error.

## Problemas encontrados (completa con los tuyos)
1.
2.
3.
