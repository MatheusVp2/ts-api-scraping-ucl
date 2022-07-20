import axios from 'axios'
import { wrapper } from 'axios-cookiejar-support'
import { Cookie, CookieJar } from "tough-cookie"
import { AuthServiceUcl, LinksUcl, SessionServiceUcl } from './types'
wrapper(axios)

class ServiceUcl {

    private getSession(session?: string, url?: string): CookieJar{
        const newSession = new CookieJar()
        if(session && url) newSession.setCookie( Cookie.parse(session), url )
        return newSession
    }

    async login(credenciais: AuthServiceUcl) : Promise<SessionServiceUcl> {
        const newSession = this.getSession()
        axios.defaults.headers.post['Referer'] = LinksUcl.LOGIN
        const authPage = await axios.get( LinksUcl.LOGIN, { jar: newSession } )
        const csfr = authPage.config.jar.toJSON().cookies[0].value || null
        credenciais.csrfmiddlewaretoken = csfr
        const dataAuthBody = new URLSearchParams(credenciais).toString()
        const authLogin = await axios.post( LinksUcl.LOGIN, dataAuthBody, { jar: newSession } )
        const cookiesPage = authLogin.headers['set-cookie']
        const cookieSession = cookiesPage.filter(cookie => cookie.match(`^sessionid`))[0] || null
        return { session: cookieSession }
    }

    async notas( { session } : SessionServiceUcl ) : Promise<any> {
        const newSession = this.getSession(session, LinksUcl.QUADRODENOTAS)
        const quadroDeNotasPage = await axios.get( LinksUcl.QUADRODENOTAS, { jar: newSession } )
        return quadroDeNotasPage.data;
    }

    async financeiro({ session } : SessionServiceUcl) : Promise<any> {
        const newSession = this.getSession(session, LinksUcl.FINANCEIRO)
        const financeiroPage = await axios.get( LinksUcl.FINANCEIRO, { jar: newSession } )
        return financeiroPage.data;
    }
    
    async horario({ session } : SessionServiceUcl) : Promise<any> {
        const newSession = this.getSession(session, LinksUcl.HORARIO)
        const horarioPage = await axios.get( LinksUcl.HORARIO, { jar: newSession } )
        return horarioPage.data;
    }

}

export {
    ServiceUcl
}
