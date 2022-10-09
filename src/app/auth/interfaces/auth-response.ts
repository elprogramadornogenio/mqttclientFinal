export interface AuthResponse {
    ok: boolean;
    uid?: string;
    nombre?: string;
    apellido?: string;
    token?: string;
    msg?: string;
    email?: string;
}