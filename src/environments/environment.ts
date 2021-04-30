// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  ambiente: "",
  production: false,
  key: "AsxG23!V*Hc%aqlm",
  googleMapsApiKey: '',
  apiUrl: 'https://localhost:44388/api',

  pathListarUsuarios: '/Usuario/ListarUsuarios',
  pathActualizarUsuario: '/Usuario/ActualizarUsuario',
  pathAgregarUsuario: '/Usuario/AgregarUsuario',
  pathEliminarUsuario: '/Usuario/EliminarUsuario',

  pathListarProductos: '/Producto/ListarProductos',
  pathObtenerProducto: '/Producto/ObtenerProducto/',
  pathActualizarProducto: '/Producto/ActualizarProducto',
  pathAgregarProducto: '/Producto/AgregarProducto',
  pathEliminarProducto: '/Producto/EliminarProducto',

  pathListarPedidos: '/Pedido/ListarPedidos',
  pathActualizarPedido: '/Pedido/ActualizarPedido',
  pathAgregarPedido: '/Pedido/AgregarPedido',
  pathEliminarPedido: '/Pedido/EliminarPedido'
};
