## Mapeo en el AOWeb

Se mapea tal cual como si estuvieses trabajando con el cliente convencional de Alkon 13.x con WorldEditor, y después usamos uno de los scripts creados por [Horacio Martinez](https://github.com/horaciomartinez), por ejemplo: [conversor_mapas.py](placeholder)

El script se encarga de transformar los archivos .map en formato JSON para que PixiJS pueda usarlos con la siguiente estructura:

_mapa1.json_

```
{
  "outdoor": 1,
  "layers": [
    [
      {
        "0": 1,
        "1": 6005
      },
      {
        "0": 1,
        "1": 6009
      },
      {
        "0": 1,
        "1": 6013
      },
      // continua
    ]
  ]
}

```

El archivo json completo contiene la informacion de cada tile: triggers, grh de superficie _(por ej el 6005 usado arriba es un grh de pasto)_, bloqueos, etc.

### Tutoriales

Se encuentran en la carpeta "Tutoriales"
