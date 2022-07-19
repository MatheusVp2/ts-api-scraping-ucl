enum LinksUcl {
    LOGIN = 'https://eies.ucl.br/webaluno/login/',
    QUADRODENOTAS = 'https://eies.ucl.br/webaluno/quadrodenotas/',
    FINANCEIRO = 'https://eies.ucl.br/webaluno/financeiro/'
}

type AuthServiceUcl = {
    user: string,
    password: string,
    csrfmiddlewaretoken?: string
}

type SessionServiceUcl = {
    session: string
}

export {
    LinksUcl,
    AuthServiceUcl,
    SessionServiceUcl
}