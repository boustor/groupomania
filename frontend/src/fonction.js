// control adresse courriel
export const checkEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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