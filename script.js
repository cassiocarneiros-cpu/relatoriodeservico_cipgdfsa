// ========= DATA ATUAL AUTOMÁTICA (DD/MM/AAAA) =========
const dataAtual = new Date();
const dia = String(dataAtual.getDate()).padStart(2, '0');
const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
const ano = dataAtual.getFullYear();
const dataFormatada = `${dia}/${mes}/${ano}`;

// ========= 13 MÓDULOS =========
const modulos = [
    { id: 'mod1', nome: 'COORDENADOR DE SERVIÇO', icone: 'fa-user-tie' },
    { id: 'mod2', nome: 'APRESENTAÇÃO', icone: 'fa-clipboard-list' },
    { id: 'mod3', nome: 'PRODUTIVIDADE', icone: 'fa-chart-line' },
    { id: 'mod4', nome: 'ESCOLTA DE EMERGÊNCIA', icone: 'fa-ambulance' },
    { id: 'mod5', nome: 'OCORRÊNCIA', icone: 'fa-exclamation-triangle' },
    { id: 'mod6', nome: '1º PELOTÃO (GUARDA/MEIOS)', icone: 'fa-shield-alt' },
    { id: 'mod7', nome: 'VIATURA DO 1º PELOTÃO', icone: 'fa-truck' },
    { id: 'mod8', nome: '2º PELOTÃO (SERRINHA)', icone: 'fa-calendar-alt' },
    { id: 'mod9', nome: '2º PELOTÃO (ESCOLTA SERRINHA)', icone: 'fa-people-arrows' },
    { id: 'mod10', nome: '3º PELOTÃO (HGCA)', icone: 'fa-hospital-alt' },
    { id: 'mod11', nome: '4º PELOTÃO (ESCOLTA SEDE)', icone: 'fa-people-arrows' },
    { id: 'mod12', nome: '5º PELOTÃO (GIRP)', icone: 'fa-car' },
    { id: 'mod13', nome: '5º PELOTÃO (MOTOS)', icone: 'fa-motorcycle' }
];

// Renderizar grid
const grid = document.getElementById('moduleGrid');
modulos.forEach(mod => {
    const card = document.createElement('div');
    card.className = 'module-card';
    card.innerHTML = `
        <i class="fas ${mod.icone}"></i>
        <div class="info"><h3>${mod.nome}</h3><p>Clique para preencher</p></div>
        <i class="fas fa-chevron-right arrow"></i>
    `;
    card.onclick = () => abrirModulo(mod.id);
    grid.appendChild(card);
});

// ========= ABRIR MÓDULO =========
function abrirModulo(modId) {
    document.getElementById('telaInicial').classList.add('hidden');
    document.getElementById('telaFormulario').classList.remove('hidden');
    const container = document.getElementById('formularioContainer');
    container.innerHTML = '';

    const modulo = modulos.find(m => m.id === modId);
    if (!modulo) return;

    const header = document.createElement('div');
    header.className = 'section-card';
    header.innerHTML = `<div class="section-title"><i class="fas ${modulo.icone}"></i> ${modulo.nome}</div>`;
    container.appendChild(header);

    switch(modId) {
        case 'mod1': container.appendChild(criarMod1()); break;
        case 'mod2': container.appendChild(criarMod2()); break;
        case 'mod3': container.appendChild(criarMod3()); break;
        case 'mod4': container.appendChild(criarMod4()); break;
        case 'mod5': container.appendChild(criarMod5()); break;
        case 'mod6': container.appendChild(criarMod6()); break;
        case 'mod7': container.appendChild(criarMod7()); break;
        case 'mod8': container.appendChild(criarMod8()); break;
        case 'mod9': container.appendChild(criarMod9()); break;
        case 'mod10': container.appendChild(criarMod10()); break;
        case 'mod11': container.appendChild(criarMod11()); break;
        case 'mod12': container.appendChild(criarMod12()); break;
        case 'mod13': container.appendChild(criarMod13()); break;
    }

    document.getElementById('btnEnviarModulo').onclick = () => enviarModulo(modId);
}

// ========= FUNÇÕES AUXILIARES =========
function campo(label, id, tipo = 'text', placeholder = '', valor = '') {
    const div = document.createElement('div');
    div.className = 'field-group';
    let input = `<input type="${tipo}" id="${id}" placeholder="${placeholder}" value="${valor}">`;
    if (tipo === 'textarea') {
        input = `<textarea id="${id}" rows="2" placeholder="${placeholder}">${valor}</textarea>`;
    }
    div.innerHTML = `<label>${label}</label>${input}`;
    return div;
}

function campoData(label, id) { 
    return campo(label, id, 'text', 'DD/MM/AAAA', dataFormatada); 
}

function campoHora(label, id) { 
    return campo(label, id, 'text', '07:00H'); 
}

function campoNumero(label, id) { 
    return campo(label, id, 'number', '0', ''); 
}

// Lista simples de nomes
function criarListaNome(label, listId, inputId) {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '14px';
    const lbl = document.createElement('label');
    lbl.textContent = label;
    lbl.style.fontWeight = '600';
    lbl.style.display = 'block';
    lbl.style.marginBottom = '4px';
    wrapper.appendChild(lbl);

    const list = document.createElement('div');
    list.className = 'list-names';
    list.id = listId;
    wrapper.appendChild(list);

    const row = document.createElement('div');
    row.className = 'inline-flex';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Nome';
    input.style.flex = '1';
    input.id = inputId;
    const btn = document.createElement('button');
    btn.className = 'btn-add';
    btn.innerHTML = '<i class="fas fa-plus-circle"></i> Add';
    btn.onclick = () => addNameToList(listId, inputId);
    row.appendChild(input);
    row.appendChild(btn);
    wrapper.appendChild(row);
    return wrapper;
}

// Lista com par Substituto + Substituído
function criarListaPermuta(label, listId, subInputId, subdoInputId) {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '14px';
    const lbl = document.createElement('label');
    lbl.textContent = label;
    lbl.style.fontWeight = '600';
    lbl.style.display = 'block';
    lbl.style.marginBottom = '4px';
    wrapper.appendChild(lbl);

    const list = document.createElement('div');
    list.className = 'list-pair';
    list.id = listId;
    wrapper.appendChild(list);

    const row = document.createElement('div');
    row.className = 'inline-flex';
    row.style.flexWrap = 'wrap';
    row.style.gap = '4px';

    const subInput = document.createElement('input');
    subInput.type = 'text';
    subInput.placeholder = 'Substituto';
    subInput.style.flex = '1';
    subInput.id = subInputId;
    const subdoInput = document.createElement('input');
    subdoInput.type = 'text';
    subdoInput.placeholder = 'Substituído';
    subdoInput.style.flex = '1';
    subdoInput.id = subdoInputId;

    const btn = document.createElement('button');
    btn.className = 'btn-add';
    btn.innerHTML = '<i class="fas fa-plus-circle"></i> Add';
    btn.onclick = () => addPairToList(listId, subInputId, subdoInputId);

    row.appendChild(subInput);
    row.appendChild(subdoInput);
    row.appendChild(btn);
    wrapper.appendChild(row);
    return wrapper;
}

// Lista para escolta emergência (Nome, Situação, Local)
function criarListaEscolta(label, listId, nomeId, sitId, localId) {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '14px';
    const lbl = document.createElement('label');
    lbl.textContent = label;
    lbl.style.fontWeight = '600';
    lbl.style.display = 'block';
    lbl.style.marginBottom = '4px';
    wrapper.appendChild(lbl);

    const list = document.createElement('div');
    list.className = 'list-pair';
    list.id = listId;
    wrapper.appendChild(list);

    const row = document.createElement('div');
    row.className = 'inline-flex';
    row.style.flexWrap = 'wrap';
    row.style.gap = '4px';

    const nomeInput = document.createElement('input');
    nomeInput.type = 'text';
    nomeInput.placeholder = 'Nome';
    nomeInput.style.flex = '1';
    nomeInput.id = nomeId;
    const sitInput = document.createElement('input');
    sitInput.type = 'text';
    sitInput.placeholder = 'Situação';
    sitInput.style.flex = '1';
    sitInput.id = sitId;
    const localInput = document.createElement('input');
    localInput.type = 'text';
    localInput.placeholder = 'Local';
    localInput.style.flex = '1';
    localInput.id = localId;

    const btn = document.createElement('button');
    btn.className = 'btn-add';
    btn.innerHTML = '<i class="fas fa-plus-circle"></i> Add';
    btn.onclick = () => addEscoltaToList(listId, nomeId, sitId, localId);

    row.appendChild(nomeInput);
    row.appendChild(sitInput);
    row.appendChild(localInput);
    row.appendChild(btn);
    wrapper.appendChild(row);
    return wrapper;
}

// Lista para ocorrência (Nome, RG/CPF, Nome da Mãe)
function criarListaOcorrencia(label, listId, nomeId, rgId, maeId) {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '14px';
    const lbl = document.createElement('label');
    lbl.textContent = label;
    lbl.style.fontWeight = '600';
    lbl.style.display = 'block';
    lbl.style.marginBottom = '4px';
    wrapper.appendChild(lbl);

    const list = document.createElement('div');
    list.className = 'list-pair';
    list.id = listId;
    wrapper.appendChild(list);

    const row = document.createElement('div');
    row.className = 'inline-flex';
    row.style.flexWrap = 'wrap';
    row.style.gap = '4px';

    const nomeInput = document.createElement('input');
    nomeInput.type = 'text';
    nomeInput.placeholder = 'Nome';
    nomeInput.style.flex = '1';
    nomeInput.id = nomeId;
    const rgInput = document.createElement('input');
    rgInput.type = 'text';
    rgInput.placeholder = 'RG ou CPF';
    rgInput.style.flex = '1';
    rgInput.id = rgId;
    const maeInput = document.createElement('input');
    maeInput.type = 'text';
    maeInput.placeholder = 'Nome da Mãe';
    maeInput.style.flex = '1';
    maeInput.id = maeId;

    const btn = document.createElement('button');
    btn.className = 'btn-add';
    btn.innerHTML = '<i class="fas fa-plus-circle"></i> Add';
    btn.onclick = () => addOcorrenciaToList(listId, nomeId, rgId, maeId);

    row.appendChild(nomeInput);
    row.appendChild(rgInput);
    row.appendChild(maeInput);
    row.appendChild(btn);
    wrapper.appendChild(row);
    return wrapper;
}

// Funções para adicionar itens
function addNameToList(listId, inputId) {
    const list = document.getElementById(listId);
    const input = document.getElementById(inputId);
    if (!input || input.value.trim() === '') return;
    const name = input.value.trim();
    const tag = document.createElement('span');
    tag.className = 'name-tag';
    const count = list.children.length + 1;
    tag.innerHTML = `${count}. ${name} <i class="fas fa-times" onclick="this.parentElement.remove()"></i>`;
    list.appendChild(tag);
    input.value = '';
}

function addPairToList(listId, subId, subdoId) {
    const list = document.getElementById(listId);
    const sub = document.getElementById(subId);
    const subdo = document.getElementById(subdoId);
    if (!sub || !subdo || (sub.value.trim() === '' && subdo.value.trim() === '')) return;
    const item = document.createElement('span');
    item.className = 'pair-item';
    const count = list.children.length + 1;
    item.innerHTML = `${count}. <span class="sub-label">Substituto:</span> ${sub.value || '-'} | <span class="sub-label">Substituído:</span> ${subdo.value || '-'} <i class="fas fa-times" onclick="this.parentElement.remove()"></i>`;
    list.appendChild(item);
    sub.value = '';
    subdo.value = '';
}

function addEscoltaToList(listId, nomeId, sitId, localId) {
    const list = document.getElementById(listId);
    const nome = document.getElementById(nomeId);
    const sit = document.getElementById(sitId);
    const local = document.getElementById(localId);
    if (!nome || nome.value.trim() === '') return;
    const item = document.createElement('span');
    item.className = 'pair-item';
    const count = list.children.length + 1;
    item.innerHTML = `${count}. <strong>${nome.value}</strong> | Situação: ${sit.value || '-'} | Local: ${local.value || '-'} <i class="fas fa-times" onclick="this.parentElement.remove()"></i>`;
    list.appendChild(item);
    nome.value = '';
    sit.value = '';
    local.value = '';
}

function addOcorrenciaToList(listId, nomeId, rgId, maeId) {
    const list = document.getElementById(listId);
    const nome = document.getElementById(nomeId);
    const rg = document.getElementById(rgId);
    const mae = document.getElementById(maeId);
    if (!nome || nome.value.trim() === '') return;
    const item = document.createElement('span');
    item.className = 'pair-item';
    const count = list.children.length + 1;
    item.innerHTML = `${count}. <strong>${nome.value}</strong> | RG/CPF: ${rg.value || '-'} | Mãe: ${mae.value || '-'} <i class="fas fa-times" onclick="this.parentElement.remove()"></i>`;
    list.appendChild(item);
    nome.value = '';
    rg.value = '';
    mae.value = '';
}

function getNames(listId) {
    const list = document.getElementById(listId);
    if (!list) return '';
    return Array.from(list.querySelectorAll('.name-tag'))
        .map(el => el.textContent.replace('✕', '').trim()).join(', ');
}

function getPairs(listId) {
    const list = document.getElementById(listId);
    if (!list) return '';
    return Array.from(list.querySelectorAll('.pair-item'))
        .map(el => el.textContent.replace('✕', '').trim()).join('; ');
}

// ========= CRIAÇÃO DOS 13 MÓDULOS =========

function criarMod1() {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.appendChild(campoData('DATA', 'm1_data'));
    div.appendChild(campoHora('HORÁRIO', 'm1_horaIni'));
    div.appendChild(campo('COORDENADOR', 'm1_coordenador'));
    div.appendChild(campo('COMANDANTE DA GUARDA', 'm1_comandante'));
    div.appendChild(campo('AUXILIAR DA GUARDA', 'm1_auxiliar'));
    div.appendChild(campo('SALA DE MEIOS', 'm1_salaMeios'));
    div.appendChild(campo('MOTORISTA', 'm1_motorista'));
    div.appendChild(criarListaNome('RECEPÇÃO', 'm1_recepcaoList', 'm1_recepcaoInput'));
    div.appendChild(campo('VTR', 'm1_vtr'));
    div.appendChild(campoNumero('HGCA QTD PM\'S 7H-19H', 'm1_hgcaDia'));
    div.appendChild(campoNumero('HGCA QTD PM\'S 19H-7H', 'm1_hgcaNoite'));
    div.appendChild(campoNumero('ESCOLTA QTD PM\'S', 'm1_escolta'));
    div.appendChild(campo('GIRP VTR', 'm1_girpVtr'));
    div.appendChild(campoNumero('GIRP QTD PM\'S', 'm1_girpQtd'));
    div.appendChild(campo('MOTOS VTR', 'm1_motoVtr'));
    div.appendChild(campoNumero('MOTOCICLISTAS QTD PM\'S', 'm1_motoQtd'));
    div.appendChild(campoNumero('VTR 4 RODAS', 'm1_vtr4'));
    div.appendChild(campoNumero('VTR 2 RODAS', 'm1_vtr2'));
    div.appendChild(campoNumero('TOTAL POLICIAIS', 'm1_total'));
    div.appendChild(campo('OBSERVAÇÃO', 'm1_obs', 'textarea'));
    return div;
}

function criarMod2() {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.appendChild(campoData('*DATA*', 'm2_data'));
    div.appendChild(campoHora('*HORÁRIO*', 'm2_horaIni'));
    div.appendChild(campo('*TIPO DE SERVIÇO* (OPERAÇÃO/EXTRA)', 'm2_tipo'));
    div.appendChild(campo('*RESPONSÁVEL*', 'm2_responsavel'));
    div.appendChild(campo('*LOCAL*', 'm2_local'));
    div.appendChild(campoNumero('*QTD DE PATRULHAS*', 'm2_patrulhas'));
    div.appendChild(campoNumero('*QTD DE POLICIAIS*', 'm2_policiais'));
    div.appendChild(campoNumero('*QTD DE VTR*', 'm2_vtr'));
    div.appendChild(campo('*OBSERVAÇÃO*', 'm2_obs', 'textarea'));
    return div;
}

function criarMod3() {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.appendChild(campoData('DATA', 'm3_data'));
    div.appendChild(campoHora('HORÁRIO', 'm3_horaIni'));
    div.appendChild(campo('TIPO DE SERVIÇO (DIÁRIO/OPERAÇÃO/EXTRA)', 'm3_tipo'));
    div.appendChild(campoNumero('PESSOAS ABORDADAS', 'm3_abordadas'));
    div.appendChild(campoNumero('VEÍCULOS 4 RODAS', 'm3_veic4'));
    div.appendChild(campoNumero('VEÍCULOS 2 RODAS', 'm3_veic2'));
    div.appendChild(campoNumero('ÔNIBUS', 'm3_onibus'));
    div.appendChild(campoNumero('PONTOS COMERCIAIS', 'm3_pontos'));
    div.appendChild(campoNumero('VEÍCULOS NOTIFICADOS', 'm3_notificados'));
    div.appendChild(campoNumero('VEÍCULOS APREENDIDOS', 'm3_apreendidos'));
    div.appendChild(campoNumero('PESSOAS CONDUZIDAS', 'm3_conduzidas'));
    div.appendChild(campoNumero('PESSOAS PRESAS', 'm3_presas'));
    div.appendChild(campo('MATERIAL APREENDIDO', 'm3_material'));
    div.appendChild(campo('OBSERVAÇÃO', 'm3_obs', 'textarea'));
    return div;
}

function criarMod4() {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.appendChild(campoData('DATA', 'm4_data'));
    div.appendChild(campoHora('HORÁRIO', 'm4_hora'));
    div.appendChild(campo('CONDUÇÃO', 'm4_conducao'));
    div.appendChild(campoNumero('QTD DE ESCOLTADOS', 'm4_qtd'));
    div.appendChild(criarListaEscolta('ESCOLTADOS', 'm4_escoltaList', 'm4_nomeInput', 'm4_sitInput', 'm4_localInput'));
    div.appendChild(campo('OBSERVAÇÃO', 'm4_obs', 'textarea'));
    return div;
}

function criarMod5() {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.appendChild(campoData('DATA', 'm5_data'));
    div.appendChild(campoHora('HORÁRIO', 'm5_hora'));
    div.appendChild(campo('CIDADE', 'm5_cidade'));
    div.appendChild(campo('ENDEREÇO', 'm5_endereco'));
    div.appendChild(criarListaOcorrencia('PESSOAS ENVOLVIDAS', 'm5_ocorrenciaList', 'm5_nomeInput', 'm5_rgInput', 'm5_maeInput'));
    div.appendChild(campo('TIPO', 'm5_tipo'));
    div.appendChild(campo('RESUMO', 'm5_resumo', 'textarea'));
    div.appendChild(campo('FONTE', 'm5_fonte'));
    return div;
}

function criarMod6() {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.appendChild(campoData('DATA', 'm6_data'));
    div.appendChild(campoHora('HORÁRIO', 'm6_horaIni'));
    div.appendChild(campo('COMANDANTE DA GUARDA', 'm6_comandante'));
    div.appendChild(campo('AUXILIAR DA GUARDA', 'm6_auxiliar'));
    div.appendChild(criarListaNome('RECEPÇÃO', 'm6_recepcaoList', 'm6_recepcaoInput'));
    div.appendChild(campo('SALA DE MEIOS', 'm6_salaMeios'));
    div.appendChild(campo('MOTORISTA DO COORDENADOR', 'm6_motorista'));
    div.appendChild(campo('PATRULHEIRO DO COORDENADOR', 'm6_patrulheiro'));
    div.appendChild(criarListaPermuta('PERMUTAS', 'm6_permutaList', 'm6_subInput', 'm6_subdoInput'));
    div.appendChild(criarListaNome('FOLGA', 'm6_folgaList', 'm6_folgaInput'));
    div.appendChild(criarListaNome('REMANEJADOS', 'm6_remanejadosList', 'm6_remanejadosInput'));
    div.appendChild(criarListaNome('ATESTADO', 'm6_atestadoList', 'm6_atestadoInput'));
    div.appendChild(criarListaNome('FALTA SEM JUSTIFICATIVA', 'm6_faltaList', 'm6_faltaInput'));
    div.appendChild(campo('OBSERVAÇÃO', 'm6_obs', 'textarea'));
    return div;
}

function criarMod7() {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.appendChild(campoData('DATA', 'm7_data'));
    div.appendChild(campoHora('HORÁRIO', 'm7_horaIni'));
    div.appendChild(campo('VTR', 'm7_vtr'));
    div.appendChild(campo('COMANDANTE', 'm7_comandante'));
    div.appendChild(campo('MOTORISTA', 'm7_motorista'));
    div.appendChild(criarListaNome('PATRULHEIRO', 'm7_patrulhaList', 'm7_patrulhaInput'));
    div.appendChild(criarListaPermuta('PERMUTAS', 'm7_permutaList', 'm7_subInput', 'm7_subdoInput'));
    div.appendChild(criarListaNome('FOLGA', 'm7_folgaList', 'm7_folgaInput'));
    div.appendChild(campo('OBSERVAÇÃO', 'm7_obs', 'textarea'));
    return div;
}

function criarMod8() {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.appendChild(campoData('DATA', 'm8_data'));
    div.appendChild(campoHora('HORÁRIO', 'm8_horaIni'));
    div.appendChild(campo('CMT DA GUARDA/SALA DE MEIOS', 'm8_cmt'));
    div.appendChild(criarListaNome('GUARNIÇÃO DE ESCOLTA', 'm8_escoltaList', 'm8_escoltaInput'));
    div.appendChild(criarListaNome('GUARITA 01', 'm8_guarita1List', 'm8_guarita1Input'));
    div.appendChild(criarListaNome('GUARITA 02', 'm8_guarita2List', 'm8_guarita2Input'));
    div.appendChild(criarListaNome('GUARITA 03', 'm8_guarita3List', 'm8_guarita3Input'));
    div.appendChild(criarListaNome('GUARITA 04', 'm8_guarita4List', 'm8_guarita4Input'));
    div.appendChild(criarListaNome('FOLGA', 'm8_folgaList', 'm8_folgaInput'));
    div.appendChild(criarListaPermuta('PERMUTAS ORDINÁRIO', 'm8_ordList', 'm8_ordSubInput', 'm8_ordSubdoInput'));
    div.appendChild(criarListaPermuta('PERMUTAS EXTRA', 'm8_extraList', 'm8_extraSubInput', 'm8_extraSubdoInput'));
    div.appendChild(criarListaPermuta('PERMUTAS ESCOLTA', 'm8_escoltaPermutaList', 'm8_escoltaSubInput', 'm8_escoltaSubdoInput'));
    div.appendChild(campo('OBSERVAÇÃO', 'm8_obs', 'textarea'));
    return div;
}

function criarMod9() {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.appendChild(campoData('DATA', 'm9_data'));
    div.appendChild(campoHora('HORÁRIO', 'm9_horaIni'));
    div.appendChild(campo('LOCAL', 'm9_local'));
    div.appendChild(criarListaNome('EFETIVO', 'm9_efetivoList', 'm9_efetivoInput'));
    div.appendChild(campo('SAÍDA', 'm9_saida'));
    div.appendChild(campo('CHEGADA', 'm9_chegada'));
    div.appendChild(campo('OBSERVAÇÃO', 'm9_obs', 'textarea'));
    return div;
}

function criarMod10() {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.appendChild(campoData('DATA', 'm10_data'));
    div.appendChild(campoHora('HORÁRIO', 'm10_horaIni'));
    div.appendChild(criarListaNome('PESSOAL DE SERVIÇO', 'm10_pessoalList', 'm10_pessoalInput'));
    div.appendChild(criarListaNome('CUSTODIADOS', 'm10_custodiadosList', 'm10_custodiadosInput'));
    div.appendChild(campo('OBSERVAÇÃO', 'm10_obs', 'textarea'));
    return div;
}

function criarMod11() {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.appendChild(campoData('DATA', 'm11_data'));
    div.appendChild(campoHora('HORÁRIO', 'm11_horaIni'));
    div.appendChild(campo('LOCAL', 'm11_local'));
    div.appendChild(criarListaNome('EFETIVO', 'm11_efetivoList', 'm11_efetivoInput'));
    div.appendChild(campo('SAÍDA', 'm11_saida'));
    div.appendChild(campo('CHEGADA', 'm11_chegada'));
    div.appendChild(campo('OBSERVAÇÃO', 'm11_obs', 'textarea'));
    return div;
}

function criarMod12() {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.appendChild(campoData('DATA', 'm12_data'));
    div.appendChild(campoHora('HORÁRIO', 'm12_horaIni'));
    div.appendChild(campo('VTR', 'm12_vtr'));
    div.appendChild(campo('COMANDANTE', 'm12_comandante'));
    div.appendChild(campo('MOTORISTA', 'm12_motorista'));
    div.appendChild(criarListaNome('PATRULHEIRO', 'm12_patrulhaList', 'm12_patrulhaInput'));
    div.appendChild(criarListaPermuta('PERMUTAS', 'm12_permutaList', 'm12_subInput', 'm12_subdoInput'));
    div.appendChild(criarListaNome('FOLGA', 'm12_folgaList', 'm12_folgaInput'));
    div.appendChild(campo('OBSERVAÇÃO', 'm12_obs', 'textarea'));
    return div;
}

function criarMod13() {
    const div = document.createElement('div');
    div.className = 'section-card';
    div.appendChild(campoData('DATA', 'm13_data'));
    div.appendChild(campoHora('HORÁRIO', 'm13_horaIni'));
    div.appendChild(campo('VTR', 'm13_vtr'));
    div.appendChild(campo('COMANDANTE', 'm13_comandante'));
    div.appendChild(criarListaNome('PATRULHEIRO', 'm13_patrulhaList', 'm13_patrulhaInput'));
    div.appendChild(criarListaPermuta('PERMUTAS', 'm13_permutaList', 'm13_subInput', 'm13_subdoInput'));
    div.appendChild(criarListaNome('FOLGA', 'm13_folgaList', 'm13_folgaInput'));
    div.appendChild(campo('OBSERVAÇÃO', 'm13_obs', 'textarea'));
    return div;
}

// ========= ENVIAR MÓDULO =========
function enviarModulo(modId) {
    let relatorio = `*POLICIA MILITAR DA BAHIA*\n*CPRL - LESTE*\n*CIPGD/FEIRA DE SANTANA*\n\n`;
    const modulo = modulos.find(m => m.id === modId);
    relatorio += `*${modulo.nome}*\n\n`;

    // Coletar campos na ordem correta para cada módulo
    if (modId === 'mod1') {
        relatorio += `*DATA*: ${document.getElementById('m1_data').value || '-'}\n`;
        relatorio += `*HORÁRIO*: ${document.getElementById('m1_horaIni').value || '-'}\n`;
        relatorio += `*COORDENADOR*: ${document.getElementById('m1_coordenador').value || '-'}\n`;
        relatorio += `*COMANDANTE DA GUARDA*: ${document.getElementById('m1_comandante').value || '-'}\n`;
        relatorio += `*AUXILIAR DA GUARDA*: ${document.getElementById('m1_auxiliar').value || '-'}\n`;
        relatorio += `*SALA DE MEIOS*: ${document.getElementById('m1_salaMeios').value || '-'}\n`;
        relatorio += `*MOTORISTA*: ${document.getElementById('m1_motorista').value || '-'}\n`;
        relatorio += `*RECEPÇÃO*: ${getNames('m1_recepcaoList') || '-'}\n`;
        relatorio += `*VTR*: ${document.getElementById('m1_vtr').value || '-'}\n`;
        relatorio += `*HGCA QTD PM'S 7H-19H*: ${document.getElementById('m1_hgcaDia').value || '-'}\n`;
        relatorio += `*HGCA QTD PM'S 19H-7H*: ${document.getElementById('m1_hgcaNoite').value || '-'}\n`;
        relatorio += `*ESCOLTA QTD PM'S*: ${document.getElementById('m1_escolta').value || '-'}\n`;
        relatorio += `*GIRP VTR*: ${document.getElementById('m1_girpVtr').value || '-'}\n`;
        relatorio += `*GIRP QTD PM'S*: ${document.getElementById('m1_girpQtd').value || '-'}\n`;
        relatorio += `*MOTOS VTR*: ${document.getElementById('m1_motoVtr').value || '-'}\n`;
        relatorio += `*MOTOCICLISTAS QTD PM'S*: ${document.getElementById('m1_motoQtd').value || '-'}\n`;
        relatorio += `*VTR 4 RODAS*: ${document.getElementById('m1_vtr4').value || '-'}\n`;
        relatorio += `*VTR 2 RODAS*: ${document.getElementById('m1_vtr2').value || '-'}\n`;
        relatorio += `*TOTAL POLICIAIS*: ${document.getElementById('m1_total').value || '-'}\n`;
        relatorio += `*OBSERVAÇÃO*: ${document.getElementById('m1_obs').value || '-'}\n`;
    } else if (modId === 'mod2') {
        const campos = document.querySelectorAll('#formularioContainer input:not([type="button"]), #formularioContainer textarea');
        campos.forEach(campo => {
            const label = campo.closest('.field-group')?.querySelector('label')?.textContent || '';
            if (label) {
                const valor = campo.value || '-';
                relatorio += `${label}: ${valor}\n`;
            }
        });
    } else if (modId === 'mod3') {
        relatorio += `*DATA*: ${document.getElementById('m3_data').value || '-'}\n`;
        relatorio += `*HORÁRIO*: ${document.getElementById('m3_hora').value || '-'}\n`;
        relatorio += `*TIPO DE SERVIÇO* (DIÁRIO/OPERAÇÃO/EXTRA): ${document.getElementById('m3_tipo').value || '-'}\n`;
        relatorio += `*PESSOAS ABORDADAS*: ${document.getElementById('m3_aborddas').value || '-'}\n`;
        relatorio += `*VEÍCULOS 4 RODAS*: ${getPairs('m3_veic4') || '-'}\n`;
        relatorio += `*VEÍCULOS 2 RODAS*: ${getPairs('m3_veic2') || '-'}\n`;
        relatorio += `*ÔNIBUS*: ${getPairs('m3_onibus') || '-'}\n`;
        relatorio += `*PONTOS COMERCIAIS*: ${getPairs('m3_pontos') || '-'}\n`;
        relatorio += `*VEÍCULOS NOTIFICADOS*: ${getPairs('m3_notificados') || '-'}\n`;
        relatorio += `*VEÍCULOS APREENDIDOS*: ${getPairs('m3_apreendidos') || '-'}\n`;
        relatorio += `*PESSOAS CONDUZIDAS*: ${getPairs('m3_conduzidas') || '-'}\n`;
        relatorio += `*PESSOAS PRESAS*: ${getPairs('m3_presas') || '-'}\n`;
        relatorio += `*MATERIAL APREENDIDO*: ${getPairs('m3_material') || '-'}\n`;
        relatorio += `*OBSERVAÇÃO*: ${document.getElementById('m3_obs').value || '-'}\n`;
   
    } else if (modId === 'mod4') {
        relatorio += `*DATA*: ${document.getElementById('m4_data').value || '-'}\n`;
        relatorio += `*HORÁRIO*: ${document.getElementById('m4_hora').value || '-'}\n`;
        relatorio += `*CONDUÇÃO*: ${document.getElementById('m4_conducao').value || '-'}\n`;
        relatorio += `*QTD DE ESCOLTADOS*: ${document.getElementById('m4_qtd').value || '-'}\n`;
        relatorio += `*ESCOLTADOS*: ${getPairs('m4_escoltaList') || '-'}\n`;
        relatorio += `*OBSERVAÇÃO*: ${document.getElementById('m4_obs').value || '-'}\n`;
    } else if (modId === 'mod5') {
        relatorio += `*DATA*: ${document.getElementById('m5_data').value || '-'}\n`;
        relatorio += `*HORÁRIO*: ${document.getElementById('m5_hora').value || '-'}\n`;
        relatorio += `*CIDADE*: ${document.getElementById('m5_cidade').value || '-'}\n`;
        relatorio += `*ENDEREÇO*: ${document.getElementById('m5_endereco').value || '-'}\n`;
        relatorio += `*PESSOAS ENVOLVIDAS*: ${getPairs('m5_ocorrenciaList') || '-'}\n`;
        relatorio += `*TIPO*: ${document.getElementById('m5_tipo').value || '-'}\n`;
        relatorio += `*RESUMO*: ${document.getElementById('m5_resumo').value || '-'}\n`;
        relatorio += `*FONTE*: ${document.getElementById('m5_fonte').value || '-'}\n`;
    } else if (modId === 'mod6') {
        relatorio += `*DATA*: ${document.getElementById('m6_data').value || '-'}\n`;
        relatorio += `*HORÁRIO*: ${document.getElementById('m6_horaIni').value || '-'}\n`;
        relatorio += `*COMANDANTE DA GUARDA*: ${document.getElementById('m6_comandante').value || '-'}\n`;
        relatorio += `*AUXILIAR DA GUARDA*: ${document.getElementById('m6_auxiliar').value || '-'}\n`;
        relatorio += `*RECEPÇÃO*: ${getNames('m6_recepcaoList') || '-'}\n`;
        relatorio += `*SALA DE MEIOS*: ${document.getElementById('m6_salaMeios').value || '-'}\n`;
        relatorio += `*MOTORISTA DO COORDENADOR*: ${document.getElementById('m6_motorista').value || '-'}\n`;
        relatorio += `*PATRULHEIRO DO COORDENADOR*: ${document.getElementById('m6_patrulheiro').value || '-'}\n`;
        relatorio += `*PERMUTAS*: ${getPairs('m6_permutaList') || '-'}\n`;
        relatorio += `*FOLGA*: ${getNames('m6_folgaList') || '-'}\n`;
        relatorio += `*REMANEJADOS*: ${getNames('m6_remanejadosList') || '-'}\n`;
        relatorio += `*ATESTADO*: ${getNames('m6_atestadoList') || '-'}\n`;
        relatorio += `*FALTA SEM JUSTIFICATIVA*: ${getNames('m6_faltaList') || '-'}\n`;
        relatorio += `*OBSERVAÇÃO*: ${document.getElementById('m6_obs').value || '-'}\n`;
    } else if (modId === 'mod7') {
        relatorio += `*DATA*: ${document.getElementById('m7_data').value || '-'}\n`;
        relatorio += `*HORÁRIO*: ${document.getElementById('m7_horaIni').value || '-'}\n`;
        relatorio += `*VTR*: ${document.getElementById('m7_vtr').value || '-'}\n`;
        relatorio += `*COMANDANTE*: ${document.getElementById('m7_comandante').value || '-'}\n`;
        relatorio += `*MOTORISTA*: ${document.getElementById('m7_motorista').value || '-'}\n`;
        relatorio += `*PATRULHEIRO*: ${getNames('m7_patrulhaList') || '-'}\n`;
        relatorio += `*PERMUTAS*: ${getPairs('m7_permutaList') || '-'}\n`;
        relatorio += `*FOLGA*: ${getNames('m7_folgaList') || '-'}\n`;
        relatorio += `*OBSERVAÇÃO*: ${document.getElementById('m7_obs').value || '-'}\n`;
    } else if (modId === 'mod8') {
        relatorio += `*DATA*: ${document.getElementById('m8_data').value || '-'}\n`;
        relatorio += `*HORÁRIO*: ${document.getElementById('m8_horaIni').value || '-'}\n`;
        relatorio += `*CMT DA GUARDA/SALA DE MEIOS*: ${document.getElementById('m8_cmt').value || '-'}\n`;
        relatorio += `*GUARNIÇÃO DE ESCOLTA*: ${getNames('m8_escoltaList') || '-'}\n`;
        relatorio += `*GUARITA 01*: ${getNames('m8_guarita1List') || '-'}\n`;
        relatorio += `*GUARITA 02*: ${getNames('m8_guarita2List') || '-'}\n`;
        relatorio += `*GUARITA 03*: ${getNames('m8_guarita3List') || '-'}\n`;
        relatorio += `*GUARITA 04*: ${getNames('m8_guarita4List') || '-'}\n`;
        relatorio += `*FOLGA*: ${getNames('m8_folgaList') || '-'}\n`;
        relatorio += `*PERMUTAS ORDINÁRIO*: ${getPairs('m8_ordList') || '-'}\n`;
        relatorio += `*PERMUTAS EXTRA*: ${getPairs('m8_extraList') || '-'}\n`;
        relatorio += `*PERMUTAS ESCOLTA*: ${getPairs('m8_escoltaPermutaList') || '-'}\n`;
        relatorio += `*OBSERVAÇÃO*: ${document.getElementById('m8_obs').value || '-'}\n`;
    } else if (modId === 'mod9') {
        relatorio += `*DATA*: ${document.getElementById('m9_data').value || '-'}\n`;
        relatorio += `*HORÁRIO*: ${document.getElementById('m9_horaIni').value || '-'}\n`;
        relatorio += `*LOCAL*: ${document.getElementById('m9_local').value || '-'}\n`;
        relatorio += `*EFETIVO*: ${getNames('m9_efetivoList') || '-'}\n`;
        relatorio += `*SAÍDA*: ${document.getElementById('m9_saida').value || '-'}\n`;
        relatorio += `*CHEGADA*: ${document.getElementById('m9_chegada').value || '-'}\n`;
        relatorio += `*OBSERVAÇÃO*: ${document.getElementById('m9_obs').value || '-'}\n`;
    } else if (modId === 'mod10') {
        relatorio += `*DATA*: ${document.getElementById('m10_data').value || '-'}\n`;
        relatorio += `*HORÁRIO*: ${document.getElementById('m10_horaIni').value || '-'}\n`;
        relatorio += `*PESSOAL DE SERVIÇO*: ${getNames('m10_pessoalList') || '-'}\n`;
        relatorio += `*CUSTODIADOS*: ${getNames('m10_custodiadosList') || '-'}\n`;
        relatorio += `*OBSERVAÇÃO*: ${document.getElementById('m10_obs').value || '-'}\n`;
    } else if (modId === 'mod11') {
        relatorio += `*DATA*: ${document.getElementById('m11_data').value || '-'}\n`;
        relatorio += `*HORÁRIO*: ${document.getElementById('m11_horaIni').value || '-'}\n`;
        relatorio += `*LOCAL*: ${document.getElementById('m11_local').value || '-'}\n`;
        relatorio += `*EFETIVO*: ${getNames('m11_efetivoList') || '-'}\n`;
        relatorio += `*SAÍDA*: ${document.getElementById('m11_saida').value || '-'}\n`;
        relatorio += `*CHEGADA*: ${document.getElementById('m11_chegada').value || '-'}\n`;
        relatorio += `*OBSERVAÇÃO*: ${document.getElementById('m11_obs').value || '-'}\n`;
    } else if (modId === 'mod12') {
        relatorio += `*DATA*: ${document.getElementById('m12_data').value || '-'}\n`;
        relatorio += `*HORÁRIO*: ${document.getElementById('m12_horaIni').value || '-'}\n`;
        relatorio += `*VTR*: ${document.getElementById('m12_vtr').value || '-'}\n`;
        relatorio += `*COMANDANTE*: ${document.getElementById('m12_comandante').value || '-'}\n`;
        relatorio += `*MOTORISTA*: ${document.getElementById('m12_motorista').value || '-'}\n`;
        relatorio += `*PATRULHEIRO*: ${getNames('m12_patrulhaList') || '-'}\n`;
        relatorio += `*PERMUTAS*: ${getPairs('m12_permutaList') || '-'}\n`;
        relatorio += `*FOLGA*: ${getNames('m12_folgaList') || '-'}\n`;
        relatorio += `*OBSERVAÇÃO*: ${document.getElementById('m12_obs').value || '-'}\n`;
    } else if (modId === 'mod13') {
        relatorio += `*DATA*: ${document.getElementById('m13_data').value || '-'}\n`;
        relatorio += `*HORÁRIO*: ${document.getElementById('m13_horaIni').value || '-'}\n`;
        relatorio += `*VTR*: ${document.getElementById('m13_vtr').value || '-'}\n`;
        relatorio += `*COMANDANTE*: ${document.getElementById('m13_comandante').value || '-'}\n`;
        relatorio += `*PATRULHEIRO*: ${getNames('m13_patrulhaList') || '-'}\n`;
        relatorio += `*PERMUTAS*: ${getPairs('m13_permutaList') || '-'}\n`;
        relatorio += `*FOLGA*: ${getNames('m13_folgaList') || '-'}\n`;
        relatorio += `*OBSERVAÇÃO*: ${document.getElementById('m13_obs').value || '-'}\n`;
    }

    relatorio += `\n🌵 *ATALAIA DO SERTÃO* 🌵\n*"Vigiar, Guardar e Proteger"*`;

    navigator.clipboard.writeText(relatorio).then(() => {
        alert('Relatório copiado! Cole no WhatsApp.');
    }).catch(() => {
        alert('Copie manualmente o texto abaixo:');
        console.log(relatorio);
    });

    if (confirm('Abrir WhatsApp para enviar este módulo?')) {
        window.open('https://wa.me/?text=' + encodeURIComponent(relatorio), '_blank');
    }
}

// ========= VOLTAR =========
function voltarInicio() {
    document.getElementById('telaInicial').classList.remove('hidden');
    document.getElementById('telaFormulario').classList.add('hidden');
}

// ========= DETECTAR INSTALAÇÃO =========
if (window.navigator.standalone) {
    document.getElementById('installBanner').style.display = 'none';
} else {
    // Mostrar banner apenas em iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        document.getElementById('installBanner').style.display = 'block';
    }
}
