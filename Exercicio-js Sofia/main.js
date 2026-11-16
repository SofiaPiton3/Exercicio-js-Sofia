function calcularDescontoPagamento(formaPagamento) {
    let desconto = 0;
    switch (formaPagamento) {
        case 'pix':
            desconto = 0.15;
            break;
        case 'boleto':
            desconto = 0.10;
            break;
        case 'cartao-vista':
            desconto = 0.05;
            break;
        case 'cartao-parcelado':
            desconto = 0.0;
            break;
        default:
            desconto = 0.0;
    }
    return desconto;
}

function calcularValorEntrega(tipoEntrega) {
    let valorFrete = 0;
    switch (tipoEntrega) {
        case 'retirada':
            valorFrete = 0.0;
            break;
        case 'padrao':
            valorFrete = 12.0;
            break;
        case 'expressa':
            valorFrete = 25.0;
            break;
        case 'super-expressa':
            valorFrete = 45.0;
            break;
        default:
            valorFrete = 0.0;
    }
    return valorFrete;
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
document.addEventListener('DOMContentLoaded', () => {
    const formOrcamento = document.getElementById('form-orcamento');
    const painelResultado = document.getElementById('painel-resultado');

    formOrcamento.addEventListener('submit', function(event) {
        event.preventDefault();
        const valorProduto = parseFloat(document.getElementById('valor-produto').value);
        const formaPagamento = document.getElementById('forma-pagamento').value;
        const tipoEntrega = document.getElementById('tipo-entrega').value;
        const taxaDesconto = calcularDescontoPagamento(formaPagamento);
        const valorDesconto = valorProduto * taxaDesconto;
        const valorFrete = calcularValorEntrega(tipoEntrega);
        const totalFinal = (valorProduto - valorDesconto) + valorFrete;

        document.getElementById('res-produto').textContent = formatarMoeda(valorProduto);
        document.getElementById('res-desconto').textContent = formatarMoeda(valorDesconto);
        document.getElementById('res-frete').textContent = formatarMoeda(valorFrete);
        document.getElementById('res-total').textContent = formatarMoeda(totalFinal);

        painelResultado.classList.remove('hidden');
    });
});
