export enum LinksUcl {
    LOGIN = 'https://eies.ucl.br/webaluno/login/',
    QUADRODENOTAS = 'https://eies.ucl.br/webaluno/quadrodenotas/',
    FINANCEIRO = 'https://eies.ucl.br/webaluno/financeiro/',
    HORARIO = 'https://eies.ucl.br/webaluno/horarioindividual/'
}

export type AuthServiceUcl = {
    user: string,
    password: string,
    csrfmiddlewaretoken?: string
}

export type SessionServiceUcl = {
    session: string
}

