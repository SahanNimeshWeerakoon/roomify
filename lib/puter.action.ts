import puter from "@heyputer/puter.js";

export const SignIn = async () => {
    try {
        let test = await puter.auth.signIn();
        return test;

    } catch(e) {
        console.log(e);
    }
}
export const SignOut = () => puter.auth.signOut();
export const GetUser = async () => {
    try {
        return await puter.auth.getUser();
    } catch {
        return null;
    }
}