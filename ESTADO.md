# cvriola · estado

**Estado al 2026-11-12, antes de la mudanza al Mac.** Demo del catálogo de Vectium: diseñador de CV
(editor, 9 plantillas, vista previa con zoom y exportación a PDF en una página). Sin desarrollo activo.

- **Repo:** `CariolaFlex/cvriola`, **público**, solo `main`. Sin ramas `claude/*`, stash, worktrees,
  PR, GitHub Actions ni webhooks.
- **Publicado:** <https://cvriola.vercel.app> responde 200. La producción es el commit `2c0bc19`
  (16-07-2026), subido **por CLI**. Los commits posteriores (`a0f5a6f` y dos de rutas) solo quitan
  una librería de skills de terceros que la app no usaba y cambian documentos: el código publicado es
  el mismo que el de `main`.
- **Origen:** la base la generó Z.ai (abril de 2026; por eso están `.zscripts/`, `Caddyfile`,
  `mini-services/`, `examples/` y `bun.lock`, que apuntan a su contenedor `/home/z/my-project` y no se
  usan). Andrés agregó las plantillas, la exportación a PDF y los arreglos.

## Datos: dónde viven

- **Los CV de los usuarios viven en el `localStorage` del navegador** (`cv-designer-storage` y
  `cv-designer-cv-<id>`). No hay servidor ni base: no están en git, ni en Vercel, ni en el zip.
  Si se armó algún CV real en el navegador de este PC, hay que bajarlo con **Exportar JSON** antes de
  entregar el PC.
- **Prisma + SQLite** (excepción al stack, ya decidida): `DATABASE_URL` en `.env` apunta a un archivo
  local relativo (`db/custom.db`). La base está **vacía** (tablas `User` y `Post`, 0 filas) y
  `src/lib/db.ts` **no se importa en ninguna parte**: es andamiaje de Z.ai. `.env` y `custom.db`
  están versionados (no tienen secretos). No hay base en la nube.

## Conexiones y cómo reconectar en el Mac

| Servicio | Qué hay | Cómo reconectar |
|---|---|---|
| GitHub | `CariolaFlex/cvriola` (público) | `git clone https://github.com/CariolaFlex/cvriola.git` |
| Vercel | Proyecto `cvriola` (`prj_CLc0EpnSAibcRCjEhHgXcOgz3oOj`), equipo `andres-cariolas-projects` (cariolaflex, Hobby), Node 24.x, preset Next.js. Dominios: `cvriola.vercel.app` y los dos alias del equipo. **Sin variables de entorno, sin crons, sin git conectado** | `vercel link --scope andres-cariolas-projects` (o con `--token` del token de cariolaflex). Publicar: `vercel --prod` (sube la carpeta local, no el commit) |
| Supabase, Firebase, n8n, pagos, correo | Nada | — |

**Por qué Vercel no tiene git (16-07-2026):** el vínculo del proyecto con el repo se corrompió del
lado de Vercel en mayo (el panel "Connected Git Repository" quedaba cargando y los push no
desplegaban). Se aprobaron los permisos pendientes de la GitHub App, se hizo `vercel git disconnect`
y `vercel git connect` falló 3 veces: `POST /v9/projects/<id>/link` cuelga y corta la conexión
(ECONNRESET / socket hang up), mientras los `GET` responden 200. Quedó desconectado y se publica por
CLI. Si se quiere arreglar: probar `vercel git connect` de nuevo o recrear el vínculo en la Fase 00
(tarea de mover proyectos al equipo `vectium`: **transferir, no recrear**, para conservar la URL).

**Secretos:** no hay. `.env` solo tiene la ruta del SQLite.

## Mac: cómo levantarlo

```bash
git clone https://github.com/CariolaFlex/cvriola.git
cd cvriola
npm install
npx prisma generate
npm run dev        # http://localhost:3000
```

- `npx prisma generate` es obligatorio después de clonar o mover la carpeta (el cliente generado
  guarda la ruta absoluta). Hoy la app no usa la base, pero el paquete está en las dependencias.
- Usar **npm** (`package-lock.json`). `bun.lock` es de Z.ai.
- `next.config.ts` tiene `output: "standalone"` e `ignoreBuildErrors: true` (el build no falla por
  tipos; hay un error de lint previo en un `useEffect` de fuentes que no bloquea).
- `.claude/launch.json` (ignorado) usa `npm run dev` en el puerto 3000: funciona igual en el Mac.
- Nada depende de Windows: no hay `.ps1` ni rutas `C:\` en el código (solo en `CLAUDE.md`).

## Archivos fuera de git

| Archivo | Clase |
|---|---|
| `.vercel/` | Necesario para publicar; se rehace con `vercel link` |
| `.claude/launch.json` | Útil, va en el zip |
| `dev.log`, `next-env.d.ts`, `tsconfig.tsbuildinfo` | Regenerables |

No hay `node_modules` ni `.next` en disco.

## Pendientes (decide Andrés)

1. 🔴 **El repo es público y tiene un CV real de una tercera persona** (HTML y PDF en `upload/` y
   `download/`, con correo, teléfono y RUT; están desde el commit inicial de abril). Con la
   Ley 21.719 vigente desde el 1-12-2026 es un riesgo. Lo más simple: **hacer el repo privado**
   (Vercel publica por CLI, así que no se rompe nada) y después decidir si se sacan los archivos y
   se limpia la historia. La visibilidad de cvriola ya figuraba como decisión pendiente (15-10).
2. Vercel sin git (ver arriba): cada cambio se publica a mano con `vercel --prod`.
3. Error conocido sin arreglar: **Importar JSON** reemplaza el CV en pantalla con el `id` del
   archivo, pero `saveCV` solo actualiza la lista si ese `id` ya existe: un JSON con otro `id` queda
   guardado pero no aparece en el panel.
4. No hay `README.md` (el índice `REPOS.md` lo nombra como documento para retomar): el documento es
   este `ESTADO.md`.
