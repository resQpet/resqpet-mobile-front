
export class Messages {
    static RequiredField: string = 'Este campo es requerido.';
    static InvalidRNC: string = 'Debe introducir un RNC válido.';
    static InvalidDocument: string = "El documento no es válido.";
    static OnlyNumber: string = "El documento solo debe contener números.";
    static InvalidGender: string = 'Debe ingresar un sexo válido.';
    static PasswordNotMatches: string = 'Las contraseñas deben coincidir.';
    static DocumentExists: string = 'Este documento ya ha sido registrado.';
    static UsernameExists: string = 'Este nombre de usuario ya ha sido registrado.';
    static EmailExists: string = 'Este correo ya ha sido registrado.';
    static LengthOf11: string = 'Este campo debe tener 11 caracteres.';
    static LengthOf10: string = 'Este campo debe tener 10 caracteres.';
    static InvalidEmail: string = 'Debe ingresar un correo válido.';
    static InvalidNumber: string = 'Debe ingresar un número válido.';
    static Unavailable: string = 'No disponible';
    static LengthOfN = (length: number) => `Este campo debe tener ${length} caracteres o menos.`;
}