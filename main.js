document.addEventListener("DOMContentLoaded", function () {
  const PuntosIniciales = document.getElementById("investmentAmount");
  const checkbox = document.getElementById("esAdret");
  const form = document.getElementById("calculatorForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const puntosInicialesValue = parseInt(PuntosIniciales.value, 10);
    if (isNaN(puntosInicialesValue) || puntosInicialesValue < 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese un número válido de puntos iniciales.",
      });
      return false;
    }

    const puntosExtras = checkbox.checked ? 6 : 3;

    // Mostrar pantalla de carga SweetAlert2
    Swal.fire({
      title: "Calculando...",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });

    // Simular carga 1 segundo
    setTimeout(() => {
      const totalPuntos = CalcularPuntosTotales(
        puntosInicialesValue,
        puntosExtras
      );
      const nivelesTotales = NivelesTotales(totalPuntos);
      const puntosRestantesValue = puntosRestantes(totalPuntos);

      // Mostrar resultado
      Swal.fire({
        icon: "success",
        title: "¡Cálculo completado!",
        html: `<p>Total de puntos: <strong>${totalPuntos}</strong></p>
               <p>Niveles totales: <strong>${nivelesTotales}</strong></p>`,
        footer: `<p>Puntos restantes despues de los niveles: <strong>${puntosRestantesValue}</strong></p>`,
        confirmButtonText: "Aceptar",
      });
    }, 1000);
  });
});

function CalcularPuntosTotales(PuntosIniciales, puntosExtras) {
  let total = 0;
  let puntos = PuntosIniciales;
  console.log(` Puntos extras: ${puntosExtras}`);

  while (puntos >= 15) {

    puntos -= 15;
    total += 15;
    puntos += puntosExtras;
  }

  total += puntos; // Agregar los puntos restantes que no alcanzan para otro ciclo
  return total;
}

function NivelesTotales(puntos) {
    let niveles = 0;

    while (puntos >= 15) {
        puntos -= 15;
        niveles++;
    }
    return niveles;
}

function puntosRestantes(puntos) {
    return puntos % 15;
}