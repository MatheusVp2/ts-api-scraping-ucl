"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapingUcl = exports.IdsTabsPeriodosEnum = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
var IdsTabsPeriodosEnum;
(function (IdsTabsPeriodosEnum) {
    IdsTabsPeriodosEnum["NOTAS"] = "aluno_notas";
    IdsTabsPeriodosEnum["HORARIOS"] = "aluno_horarios";
})(IdsTabsPeriodosEnum = exports.IdsTabsPeriodosEnum || (exports.IdsTabsPeriodosEnum = {}));
class ScrapingUcl {
    static isStillSessionAvaliable(html) {
        return false;
    }
    static getPeriodos(html, id) {
        const $ = cheerio_1.default.load(html);
        return $(`div[id="${id}"] .tabs li a`).map((index, item) => $(item).attr('href').trim().replace('#', '')).toArray();
    }
    static getHtmlPeriodo(html, periodo) {
        const $ = cheerio_1.default.load(html);
        return $(`div[id=${periodo}]`).toString();
    }
    static getMaterias(html) {
        const $ = cheerio_1.default.load(html);
        return $('.collapsible-header').map((index, item) => {
            const materia = item.lastChild.data.trim();
            return materia;
        }).toArray();
    }
    static getProfessores(html) {
        const $ = cheerio_1.default.load(html);
        return $('.collection-item').children().map((index, item) => {
            let subItemProfessor = item.children[1];
            let nome = subItemProfessor.data.trim().split('(')[0].trim();
            let email = subItemProfessor.data.trim().split('(')[1].replace(')', '');
            return { nome, email };
        }).toArray();
    }
    static getChipsExtract(master) {
        const situacao = master[0].children[0].data.trim();
        const carga_horaria = master[1].children[0].data.trim();
        const faltas = master[2].children[0].data.trim();
        const media = master[3].children[0].data.trim();
        return { situacao, carga_horaria, faltas, media };
    }
    static getChips(html) {
        const $ = cheerio_1.default.load(html);
        return $('.center-align').map((index, item) => {
            const master = $(item).find('.chip');
            if (master.length === 4) {
                return this.getChipsExtract(master);
            }
        }).toArray();
    }
    static getNotasExtract(master_tr) {
        const grupo = master_tr[0].children[0].data.trim();
        const data = master_tr[1].children[0].data.trim();
        const avaliacao = master_tr[2].children[0].data.trim();
        const peso = master_tr[3].children[0].data.trim();
        const nota = master_tr[4].children[0].data.trim();
        return { grupo, data, avaliacao, peso, nota };
    }
    static getNotas(html) {
        const $ = cheerio_1.default.load(html);
        return $('tbody').map((index_tbody, item_tbody) => {
            const master = $(item_tbody).find('tr').map((index_tr, item_tr) => {
                const master_tr = $(item_tr).find('td');
                return this.getNotasExtract(master_tr);
            }).toArray();
            return Array(master);
        }).toArray();
    }
    static getNotasPeriodoExtract(html) {
        const materias = this.getMaterias(html);
        const professores = this.getProfessores(html);
        const chips = this.getChips(html);
        const notas = this.getNotas(html);
        return { materias, professores, chips, notas };
    }
    static getNotasPeriodo(pagina, periodo) {
        const html = this.getHtmlPeriodo(pagina, periodo);
        const { materias, professores, chips, notas } = this.getNotasPeriodoExtract(html);
        const aulas = materias.map((item, index) => {
            return { materia: item, professor: professores[index], chip: chips[index], avaliacao: notas[index] };
        });
        return { periodo, aulas };
    }
    static getAllNotasPeriodos(pagina) {
        const periodos = this.getPeriodos(pagina, IdsTabsPeriodosEnum.NOTAS);
        return periodos.map(item => {
            return this.getNotasPeriodo(pagina, item);
        });
    }
    static getBoletos(html) {
        const $ = cheerio_1.default.load(html);
        return $('#fin1 table tbody tr').map((index, item) => {
            const master_td = $(item).find('td');
            const ocorrencia = master_td[0].children[0].data.trim();
            const processamento = master_td[1].children[0].data.trim();
            const vencimento = master_td[2].children[0].data.trim();
            const valor = master_td[3].children[0].data.trim();
            const findBoleto = $(master_td[5]).find('a');
            const boleto = findBoleto.length != 0 ? findBoleto[0].attribs.href : null;
            return { ocorrencia, processamento, vencimento, valor, boleto };
        }).toArray();
    }
}
exports.ScrapingUcl = ScrapingUcl;
