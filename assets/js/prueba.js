const input = document.getElementById("cantidad");
const tipoMoneda = document.getElementById("moneda");
const btn = document.getElementById("convertir");
const result = document.getElementById("resultado");


const getApi = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al obtener los datos de la API.");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        result.innerHTML = "<p>Error al cargar los datos. Intenta nuevamente.</p>";
    }
};


const renderDom = (data) => {
    const valorDolar = data.dolar.valor;
    const valorEuro = data.euro.valor;
    const monedaSeleccionada = tipoMoneda.value.toLowerCase();
    const montoIngresado = parseFloat(input.value);

    if (isNaN(montoIngresado) || montoIngresado <= 0) {
        result.innerHTML = "<p>Por favor, ingresa un monto válido.</p>";
        return;
    }

    const conversiones = {
        dolar: (montoIngresado / valorDolar).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        }),
        euro: (montoIngresado / valorEuro).toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR",
        }),
    };

    if (monedaSeleccionada in conversiones) {
        result.innerHTML = `<p>Monto: ${conversiones[monedaSeleccionada]} (${monedaSeleccionada.toUpperCase()})</p>`;
    } else {
        result.innerHTML = "<p>Por favor selecciona una moneda válida.</p>";
    }
};


const manejarConversion = async () => {
    const data = await getApi("https://mindicador.cl/api/");
    if (data) renderDom(data);
};


btn.addEventListener("click", manejarConversion);
