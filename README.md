# Argentum Online Web - Cliente

![License](https://img.shields.io/github/license/ominousg/ao-web-client.svg) ![Issues](https://img.shields.io/github/issues/ominousg/ao-web-client.svg) [![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/)

Cliente AOWeb usando como base el [dakara-client](https://github.com/horacioMartinez/dakara-client) creado por horacioMartinez. Usa [Pixi JS](https://github.com/pixijs/pixijs), que es un renderizador de WebGL y Canvas. Este repositorio va de la mano con [ao-web-server](https://github.com/ominousg/ao-web-server).

La idea es ir completandolo y agregandole cosas nuevas, como por ejemplo deferred shading, VFXs con shaders, texturas comprimidas (KTX), animación esquelética con Spine/DragonBones, etc como se ve en [este video](https://www.youtube.com/watch?v=LJuugcE5viE). Para saber mas recomiendo chequear los [issues](https://github.com/ominousg/ao-web-client/issues). Se aceptan pull requests!

Funciona con el [dakara-server](https://github.com/DakaraOnline/dakara-server) en C++ creado por AlejoLP y el [servidor convencional](https://www.gs-zone.org/temas/cliente-y-servidor-v0-13-3.86279/) (13.3) en VB6.

[Tutorial sobre cómo conectar el cliente con el dakara-server en Ubuntu](https://www.youtube.com/watch?v=Xm2XIWiqPvs)

[Explicación de Websockify por horacioMartinez](https://github.com/horacioMartinez/dakara-client/wiki/Hostear-servidor-propio)

# Instrucciones

Con la nueva migración de RequireJS a Webpack ya no es necesario usar npx http-server para el desarrollo: usamos npm run start en su lugar. Para crear el build: npm run build. Después para hostear el build (carpeta dist) en producción sí se puede usar npx http-server.

```
git clone https://github.com/ominousg/ao-web-client.git
cd client
npm i
npm run start
```

## Galería

![](https://i.imgur.com/BIpoHvE.png)
[Loadtesting](https://www.youtube.com/watch?v=D8p-pyC8EhM)

![](https://i.imgur.com/3g2XaXN.png)

![](https://i.imgur.com/QmUsBxX.png)

![](https://i.imgur.com/5FXT8ez.png)
