import bcrypt from "bcrypt";

const hassGenerate = async (password) => {
  const passHash = await bcrypt.hash(password, 10);
  return passHash;
};

const hassCompare = async (password, dbPassword) => {
  const passHash = await bcrypt.compare(password, dbPassword);
  return passHash;
};

/**
 * Funcion de validacion para cambios en la contraseña.
 * @param {*} password contraseña ingresada por el usuario.
 * @param {*} userfind usuario extraido de la base de datos
 * @returns  retorna la variable pass que contiene la contraseña del usuario, ya sea  que la haya modificado o no.
 */
const passwordChangeValidate = async(password,userfind)=>{
  let pass ="";
  if (password) {
    const passHash = await hassCompare(
      password,
      userfind.password
    );
    if (!passHash) {
      return pass = await bcrypt.hash(password, 10);
    } else {
      return pass = userfind.password;
    }
  } else {
    return pass = userfind.password;
  }
}


export default { hassGenerate, hassCompare,passwordChangeValidate };
