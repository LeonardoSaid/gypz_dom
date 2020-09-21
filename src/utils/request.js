import { notification } from 'antd';

/**
 * Requests a URL, returning a JSON Object.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option]  The options we want to pass to "fetch"
 * @return {object}            An object containing either JSON data or an error
 */
export default async function request(url, options) {
    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if(json.detail && json.detail === "Signature has expired.") {
            notification.warning({ message: 'Seu token de acesso expirou', description: 'Faça login novamente para continuar utilizando a plataforma.' });
        }
        return json;
    } catch (e) {
        return { detail: "The requested URL failed to provide a proper response." };
    }
}