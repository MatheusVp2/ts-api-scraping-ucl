
import cheerio from "cheerio"

export enum IdsTabsPeriodosEnum {
    NOTAS = 'aluno_notas',
    HORARIOS = 'aluno_horarios'
}

export class ScrapingUcl {

    static isStillSessionAvaliable(html: any) : boolean {
        return false;
    }

    static getPeriodos (html: any, id: IdsTabsPeriodosEnum ) {
        const $ = cheerio.load(html);
        return $(`div[id="${id}"] .tabs li a`).map( (index, item) => $(item).attr('href').trim().replace('#', '') ).toArray()
    }

    static getHtmlPeriodo (html: any, periodo: string) : string {
        const $ = cheerio.load(html);
        return $(`div[id=${periodo}]`).toString()
    }

    static getMaterias (html: any) {
        const $ = cheerio.load(html)
        return $('.collapsible-header').map( (index, item) => {
            const materia = (item.lastChild as any ).data.trim()
            return materia
        } ).toArray()
    }

    static getProfessores (html: any) {
        const $ = cheerio.load(html)
        return $('.collection-item').children().map( (index, item) => {
            let subItemProfessor = ( item.children[1] as any )
            let nome = subItemProfessor.data.trim().split('(')[0].trim()
            let email = subItemProfessor.data.trim().split('(')[1].replace(')', '')
            return { nome, email }
        }).toArray()
    }
    
    private static getChipsExtract ( master: any ) {
        const situacao = ( master[0].children[0] as any ).data.trim()
        const carga_horaria = ( master[1].children[0] as any ).data.trim()
        const faltas = ( master[2].children[0] as any ).data.trim()
        const media = ( master[3].children[0] as any ).data.trim()
        return { situacao, carga_horaria, faltas, media }
    }

    static getChips (html: any) {
        const $ = cheerio.load(html)
        return $('.center-align').map( ( index, item ) => {
            const master = $(item).find('.chip')
            if( master.length === 4 ) {
                return this.getChipsExtract(master)
            }
        }).toArray()
    }

    private static getNotasExtract (master_tr: any) {
        const grupo = (master_tr[0].children[0] as any).data.trim()
        const data = (master_tr[1].children[0] as any).data.trim()
        const avaliacao = (master_tr[2].children[0] as any).data.trim()
        const peso = (master_tr[3].children[0] as any).data.trim()
        const nota = (master_tr[4].children[0] as any).data.trim()
        return { grupo, data, avaliacao, peso, nota }
    }

    static getNotas (html: any) {
        const $ = cheerio.load(html)
        return $('tbody').map( ( index_tbody, item_tbody ) => {
            const master = $(item_tbody).find('tr').map( ( index_tr, item_tr ) => {
                const master_tr = $(item_tr).find('td')
                return this.getNotasExtract(master_tr)
            }).toArray()
            return Array(master)
        }).toArray()
    }

    private static getNotasPeriodoExtract (html: any) {
        const materias = this.getMaterias(html)
        const professores = this.getProfessores(html)
        const chips = this.getChips(html)
        const notas = this.getNotas(html)
        return { materias, professores, chips, notas }
    }

    static getNotasPeriodo (pagina: string, periodo: string) {
        const html = this.getHtmlPeriodo(pagina, periodo)
        const { materias, professores, chips, notas } = this.getNotasPeriodoExtract(html)
        const aulas =  materias.map( (item, index) => {
            return { materia: item, professor: professores[index], chip: chips[index], avaliacao: notas[index] }
        })
        return { periodo, aulas }
    }

    static getAllNotasPeriodos(pagina: any) {
        const periodos = this.getPeriodos( pagina, IdsTabsPeriodosEnum.NOTAS )
        return periodos.map(item => {
            return this.getNotasPeriodo(pagina, item)
        })
    }

    static getBoletos (html: any) {
        const $ = cheerio.load(html)
        return $('#fin1 table tbody tr').map( ( index, item ) => {
            const master_td = $(item).find('td')

            const ocorrencia = (master_td[0].children[0] as any).data.trim()
            const processamento = (master_td[1].children[0] as any).data.trim()
            const vencimento = (master_td[2].children[0] as any).data.trim()
            const valor = (master_td[3].children[0] as any).data.trim()
            
            const findBoleto = $(master_td[5]).find('a')
            const boleto = findBoleto.length != 0 ? findBoleto[0].attribs.href : null
            
            return { ocorrencia, processamento, vencimento, valor, boleto }
        } ).toArray()
    }

}