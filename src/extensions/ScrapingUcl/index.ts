
import cheerio from "cheerio";

class ScrapingUcl {

    static isStillSessionAvaliable(html: any) : boolean {
        return false;
    }

    static parseQuadroDeNotas(html: any) {
        const $ = cheerio.load(html);

        let list_tabs = []
        $('.tabs a').map((index, elem) => list_tabs.push( $(elem).attr('href').trim().replace('#', '') ))

        var list_html = list_tabs.map((elem) => $(`#${elem}`).html() ) // Gera o HTML dos Anos
        var $$ = list_html.map((elem) => cheerio.load(elem))          // Gera o Objeto Cheerio dos Html dos Anos

        /* ############### Pega as Materias ############### */
        let lista_materias = []
        $$.map((element) => {
            let base = []
            element('.collapsible-header').map((index, elem: any) => {
                base.push(elem.children[1].data.trim())
            })
            lista_materias.push(base)
        });

        /* ############### Pega os Professores ############### */
        let lista_professores = []
        $$.map(element => {
            let base = []
            element('.collection-item').children().map((index, elem : any) => {
                let professor = elem.children[1].data.trim().split('(')[0].trim()
                let email = elem.children[1].data.trim().split('(')[1].replace(')', '')
                base.push([professor, email])
            })
            lista_professores.push(base)
        })

        /* ############### Pega os Chips ( Situação, Carga Horaria, Faltas, Media ) ############### */
        let lista_chips = []
        $$.map(element => {
            let base_um = []
            element('.center-align').map((index, ell:any) => {
                let base_dois = []
                $(ell).find('.chip').map((cout, elem: any) => {
                    base_dois.push( elem.children[0].data.replace('\n', '').trim() )
                })
                base_um.push(base_dois)
            })
            lista_chips.push(base_um.filter(x => x.length > 1))
        })

        /* ############### Pega as Notas ############### */
        let lista_notas = []
        $$.map(element => {
            let geral = []
            element('tbody').map((index, ell:any) => {
                let base_um = []
                $(ell).find('tr').map((iindex, elemento:any) => {
                    let base_dois = []
                    $(elemento).find('td').map((cout, elem:any) => {
                        base_dois.push(elem.children[0].data.trim())
                    })
                    base_um.push(base_dois)
                })
                geral.push(base_um)
            })
            lista_notas.push(geral)
        })

        return [ list_tabs, lista_materias, lista_professores, lista_chips, lista_notas ]
    }

    static parseFinanceiro(html: any) {
        const $ = cheerio.load(html);

        const tab_fin_open   = $('#fin1')
        const table_fin_open = $(tab_fin_open).find('table')
        const tbody          = $(table_fin_open).find('tbody')
        const tr             = $(tbody).find('tr')

        let lista_boletos = []
        tr.map((index, elem) => {
            let base = []
            
            $(elem).find('td').map((cout, elem: any) => {
                base.push(elem.children[0].data.trim())
            })

            var url_boleto = $( $(elem).children()[5] ).find('a')

            if (url_boleto.length >= 3) {
                base[4] = true
                base[5] = url_boleto[0].attribs.href
            } else {
                base[4] = false
                base[5] = null
            }

            let dataJson = {
                id: base[0],
                processamento: base[1],
                vencimento: base[2],
                valor: base[3],
                is_Open: base[4],
                url: base[5],
            }

            lista_boletos.push(dataJson)
        })

        return lista_boletos
    }

    static getTabsIds (html: any, id: string): String[] {
        const $ = cheerio.load(html);
        return $(`div[id="${id}"] .tabs li a`).map( (index, item) => $(item).attr('href').trim().replace('#', '') ).toArray()
    }
    

}

export {
    ScrapingUcl
}