import bcrypt from 'bcryptjs';
import { jwtSecretKey } from '../configuration/config.js';
import { log } from '../util/general.js';


const compararContraseña = (contraseña, hash) => bcrypt.compareSync(contraseña, hash);

const processLogin = async (
    Email,
    Password
  ) => {
    const usuario = await obtenerUsarioEmail(Email).catch((error) => {
      log.error({
        STATUS: 'error',
        DESCRIPTION: 'Error en la solicitud a la base de datos.',
        STACK: error.stack,
      });
      throw new Error('Error en la solicitud a la base de datos.');
    });
    if (usuario) {
      if (usuario.length > 0 && usuario[0].length > 0) {
        const { ID_ESTATUS, DESCRIPCION_ESTATUS, ...user } = usuario[0][0];
        if (ID_ESTATUS === 1 && compararContraseña(Password, user.contrasena)) {
          const TOKEN = encodeSession(jwtSecretKey, {
            id: user.uid_usuario,
            correo: user.correo,
            nombre: user.nombre,
            apellido_paterno: user.apellido_paterno,
            apellido_materno: user.apellido_materno,
            puesto: user.puesto,
            ultimo_acceso: user.ultimo_acceso,
            telefono: user.telefono,
            uid_rol: user.uid_rol,
            dateCreated: Date.now(),
          });
          generarUltimoAcceso(user.uid_usuario);
          return {
            responseStatus: 200,
            responseProcess: {
              ...LOGIN_SUCCESS,
              ...TOKEN,
              userData: {
                username: user.nombre,
                role: user.puesto,
                email: user.correo,
                apellido_paterno: user.apellido_paterno,
                apellido_materno: user.apellido_materno,
                telefono: user.telefono,
                url: user.url,
                ability: [
                  {
                    action: 'manage',
                    subject: 'all',
                  },
                ],
              },
              TIMESTAMP: Date.now(),
            },
          };
        }
        return {
          responseStatus: 401,
          responseProcess: {
            ...AUTH_FAILED,
            message: 'Email o contraseña incorrectos.',
            TIMESTAMP: Date.now(),
          },
        };
      }
    }
    return {
      responseStatus: 401,
      responseProcess: {
        ...AUTH_FAILED,
        message: 'Email o contraseña incorrectos.',
        TIMESTAMP: Date.now(),
      },
    };
  };


  export {processLogin};