import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    // para utilizar el PORT
    PORT: get('PORT').required().asPortNumber(),
    // Si no viene public_path por defecto utiliza public
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
}
