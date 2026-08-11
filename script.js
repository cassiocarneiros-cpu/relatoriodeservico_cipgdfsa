// ========= ENVIAR MÓDULO =========
function enviarModulo(modId) {
    let relatorio = `*POLICIA MILITAR DA BAHIA*\n*CPR-LESTE*\n*Região Maria Quitéria*\n*UOPM: CIPGd-FEIRA DE SANTANA*\n\n`;
    const modulo = modulos.find(m => m.id === modId);
    relatorio += `*${modulo.nome}*\n\n`;

    // Função auxiliar para adicionar campo apenas se preenchido
    function addCampo(label, valor) {
        if (valor && valor.trim() !== '') {
            relatorio += `*${label}*: ${valor.trim()}\n`;
        }
    }

    // Função auxiliar para adicionar lista apenas se tiver itens
    function addLista(label, listId) {
        const itens = getNames(listId);
        if (itens && itens.trim() !== '') {
            // Divide os itens e formata cada um em uma linha separada
            const listaArray = itens.split(', ');
            relatorio += `*${label}*:\n`;
            listaArray.forEach(item => {
                if (item.trim() !== '') {
                    relatorio += `  • ${item.trim()}\n`;
                }
            });
            relatorio += `\n`;
        }
    }

    // Função auxiliar para adicionar lista de pares (permutas, etc)
    function addListaPares(label, listId) {
        const itens = getPairs(listId);
        if (itens && itens.trim() !== '') {
            const listaArray = itens.split('; ');
            relatorio += `*${label}*:\n`;
            listaArray.forEach(item => {
                if (item.trim() !== '') {
                    relatorio += `  • ${item.trim()}\n`;
                }
            });
            relatorio += `\n`;
        }
    }

    // Função auxiliar para adicionar lista de escolta (3 campos)
    function addListaEscolta(label, listId) {
        const list = document.getElementById(listId);
        if (!list) return;
        const items = Array.from(list.querySelectorAll('.pair-item'));
        if (items.length === 0) return;
        relatorio += `*${label}*:\n`;
        items.forEach(item => {
            const texto = item.textContent.replace('✕', '').trim();
            if (texto) {
                relatorio += `  • ${texto}\n`;
            }
        });
        relatorio += `\n`;
    }

    // Verifica cada módulo e adiciona apenas campos preenchidos
    // [código para cada módulo...]
}
