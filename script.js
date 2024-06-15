const formulario = document.getElementById('formulario'); //* Declara el formulario para mas adelanta programar como va a interactuar

// TODO: Este array contiene todos los inputs que están dentro del formulario
const inputs = document.querySelectorAll('#formulario input')

// TODO: Este array contiene expresiones generales para los formularios
const expresiones = { 
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    password2: false,
    correo: false,
    telefono: false
}


// TODO: Se declara una constante en la que continuamente está validando el registro del usuario
// la "e" es el parametro, es lo que contenga el formulario, si esta se cumple, ejecuta una función
const validarFormulario = (e)=> {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
        break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre')
        break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password')
            validarPassword2();
        break;
        case "password2":
            validarPassword2();
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo')
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono')
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`). classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else{
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[password] = false;
    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[password] = true;
    }
}

// TODO: Esta funcion hace que cada interaccion que se haga en los inputs, ejecute la funcion en la que valida la informacion dentro
inputs.forEach((input)=>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);

//* Accede al arreglo.Cada elemento dentro(Llama la funcion(establece los inputs del html como parametro)=>{
//*     si el input del html.obtiene un evento('soltar una tecla', se ejecuta una variable);
//*     si el input del html.obtiene un evento('dar click fuera de', se ejecuta una variable);
//* })
})

// TODO: Aquí solamente establece que cada vez que se le de al boton de enviar, no se refresque la pagina y el usuario pueda volver a llenar datos (este metodo es opcional)
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); //El preventDefault evita que se refresque la pagina y el elemento u objeto reestablesca su forma original

    const terminos = document.getElementById('terminos')
    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo')
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo')
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto')
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
    }

    //* Accede al formulario.obtiene un evento('Enviar', (el parametro es lo que contenga el formulario)=>{
//*     accede a lo que contenga el formulario.solamente va a limpiarlo o reiniciarlo
//*})
});