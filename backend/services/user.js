import user from "../models/user.js";
import bcrypt from "../lib/bcrypt.js"

const isChanges = async (User, password) => {
  let changes = false;
  const userData = await user.findOne({
    name: User.name,
    email: User.email,
    password: password,
    roleId: User.roleId,
  });
  return userData ? (changes = true) : changes;
};

/**
 * Funcion de validacion para usuario y contraseña ingresados
 * @param {*} userBody usuario consultado si coincide el email ingresado con el de BD (email).
 * @param {*} userLogin JSON enviado desde el front con email y contraseña para ser validados.
 * @returns retorna una respuesta en caso de no cumplir con los filtros especificados.
 */
const validLogin = async (userBody, userLogin) => {
  const{email,password}=userBody;
  let flag = false;
  if (!userLogin){
    return flag;
  }
  let pass = await bcrypt.hassCompare(password, userLogin.password);
  if (!pass){
    return flag;
  }
  if (!userLogin.dbStatus){
    return flag; 
  }
  flag=true;
  return flag;
};

export default { isChanges,validLogin };
