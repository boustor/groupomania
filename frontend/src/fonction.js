// control adresse courriel
export const checkEmail = (email) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)){
        return false
    }
}// control mot de passe


export const checkMdp = (pswd) => { 
    if (
        pswd.match(/[0-9]/g) && //Au moins 1 chiffre.
        pswd.match(/[A-Z]/g) && //Au moins 1 caractère majuscule.
        pswd.match(/[a-z]/g) && //Au moins 1 caractère minuscule.
        pswd.match(/[^a-zA-Z\d]/g) && //Au moins 1 caractère spécial.
        pswd.length >= 8) {
        return true
    } else {
        return false
    }
}