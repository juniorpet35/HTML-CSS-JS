function calcularInss() {
    var inValor = document.getElementById("inValor");
    var outCalculo = document.getElementById("outCalculo");
    
    var valor = Number(inValor.value);  // Converte o valor de entrada para número
    
    if (isNaN(valor) || valor == "") {
        alert("Digite um valor válido para calcular o INSS.");
        inValor.focus();
        return;
    }

    var inss = 0;
    
    // Faixa de contribuição do INSS
    if (valor > 0 && valor <= 1518) {
        inss = valor * 0.075;
        outCalculo.textContent = "INSS: R$ " + inss.toFixed(2);
    } else if (valor > 1518 && valor <= 2793.88) {
        inss = ((valor - 1518) * 0.09) + (1518 * 0.075);
        outCalculo.textContent = "INSS: R$ " + inss.toFixed(2);
    } else if (valor > 2793.88 && valor <= 4190.83) {
        inss = (1518 * 0.075) + ((2793.88 - 1518) * 0.09) + ((valor - 2793.88) * 0.12);
        outCalculo.textContent = "INSS: R$ " + inss.toFixed(2);
    } else if (valor > 4190.83 && valor <= 8157.41) {
        inss = (1518 * 0.075) + ((2793.88 - 1518) * 0.09) + ((4190.83 - 2793.88) * 0.12) + ((valor - 4190.83) * 0.14);
        outCalculo.textContent = "INSS: R$ " + inss.toFixed(2);
    } else if (valor > 8157.41) {
        outCalculo.textContent = "INSS: R$ 951.62 (teto máximo)";
    }
}

var btCalcular = document.getElementById("btCalcular");
btCalcular.addEventListener("click", calcularInss);

function calcularIrrf() {
    console.log("Hello, World!");
    var outValorIr = document.getElementById("outValorIr");
    var inValor = document.getElementById("inValor");
    var valorIr = parseFloat(inValor.value);  // Obtém o valor do salário para cálculo do IRRF
    var inss = Number(document.getElementById("outCalculo").textContent.replace("INSS: R$ ", "").replace(" (teto máximo)", "")); // Pega o INSS calculado
    var outDescIr = document.getElementById("outDescIr");
    var valorLiq = document.getElementById("valorLiq");
    var outValorLiq = document.getElementById("outValorLiq");
    
    var irrf = 0;
    var faixaUmIr = 169.44;
    var faixaDoisIr = 381.44;
    var faixaTresIr = 662.77;
    var faixaQuatroIr = 896.00;

    // Dedução para o cálculo
    //var deducao = inss < 564.80 ? inss : 564.80;
    var deducao = 0;
    if (inss < 564.80){
        deducao = 564.80;
    }else {
        deducao = inss;
    }

    if (inss == "") {
        alert("Primeiro calcule o INSS.");
        inValor.focus();
        return;
    }

    if (valorIr < 2259.20) {
        outValorIr.textContent = "Você não tem valor suficiente para cálculo de IR.";
        valorLiq = valorIr - inss - irrf;
        outValorLiq.textContent = "Sua remuneração líquida é: R$ " + valorLiq.toFixed(2);
    } else if (valorIr >= 2259.21 && valorIr <= 2826.65) {
        irrf = ((valorIr - deducao) * 0.075) - faixaUmIr;
        if (irrf < 0){
            outValorIr.textContent = "Você não tem desconto de IRRF";
            valorLiq = valorIr - inss - irrf;
            outValorLiq.textContent = "Sua remuneração líquida é: R$ " + valorLiq.toFixed(2);
        } else {
            outValorIr.textContent = "IRRF: R$ " + irrf.toFixed(2) + "\n e foi utilizado o desconto: R$ " + deducao.toFixed(2);
            valorLiq = valorIr - inss - irrf;
            outValorLiq.textContent = "Sua remuneração líquida é: R$ " + valorLiq.toFixed(2);
        }
    } else if (valorIr >= 2826.66 && valorIr <= 3751.05) {
        irrf = ((valorIr - deducao) * 0.15) - faixaDoisIr;
        if (irrf < 0){
            outValorIr.textContent = "Você não tem desconto de IRRF";
            valorLiq = valorIr - inss - irrf;
            outValorLiq.textContent = "Sua remuneração líquida é: R$ " + valorLiq.toFixed(2);
        } else {
            outValorIr.textContent = "IRRF: R$ " + irrf.toFixed(2) + "\n e foi utilizado o desconto: R$ " + deducao.toFixed(2);
            valorLiq = valorIr - inss - irrf;
            outValorLiq.textContent = "Sua remuneração líquida é: R$ " + valorLiq.toFixed(2);
        }
    } else if (valorIr >= 3751.06 && valorIr <= 4664.68) {
        irrf = ((valorIr - deducao) * 0.225) - faixaTresIr;
        outValorIr.textContent = "IRRF: R$ " + irrf.toFixed(2)+ "\n e foi utilizado o desconto: R$ " + deducao.toFixed(2);
        valorLiq = valorIr - inss - irrf;
        outValorLiq.textContent = "Sua remuneração líquida é: R$ " + valorLiq.toFixed(2);
    } else if (valorIr >= 4664.69) {
        irrf = ((valorIr - deducao) * 0.275) - faixaQuatroIr;
        outValorIr.textContent = "IRRF: R$ " + irrf.toFixed(2)+ "\n e foi utilizado o desconto: R$ " + deducao.toFixed(2);
        valorLiq = valorIr - inss - irrf;
        outValorLiq.textContent = "Sua remuneração líquida é: R$ " + valorLiq.toFixed(2);
    }
}

var btCalcularIrrf = document.getElementById("btCalcularIrrf");
btCalcularIrrf.addEventListener("click", calcularIrrf);