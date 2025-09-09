const datosCompletos = {
        "31pte": [
            {
                noEmp: "1001",
                nombre: "Ana Gómez",
                unidad: "Contabilidad",
                fechaGen: "2025-08-01",
                motivo: "Horas Extra",
                responsable: "J. Martínez",
                horasGen: "8",
                fechasTomadas: "2025-08-05, 2025-08-06",
                horasTomadas: "4",
                restante: "4",
                actualizacion: "2025-08-07",
                observaciones: "Ninguna"
            },
            {
                noEmp: "1002",
                nombre: "Luis Pérez",
                unidad: "Ventas",
                fechaGen: "2025-08-02",
                motivo: "Compensación",
                responsable: "M. López",
                horasGen: "6",
                fechasTomadas: "2025-08-04",
                horasTomadas: "6",
                restante: "0",
                actualizacion: "2025-08-06",
                observaciones: ""
            }
        ],
        "villas": [
            {
                noEmp: "2001",
                nombre: "María Rodríguez",
                unidad: "Logística",
                fechaGen: "2025-08-03",
                motivo: "Horas Extra",
                responsable: "R. Sánchez",
                horasGen: "5",
                fechasTomadas: "2025-08-07",
                horasTomadas: "2",
                restante: "3",
                actualizacion: "2025-08-08",
                observaciones: "Revisión pendiente"
            }
        ],
        "nave": [],
        "rioblanco": []
    };

    function cargarDatos(sucursal) {
        const tbody = document.getElementById('reporteBody');
        tbody.innerHTML = '';

        let datos = [];
        if (sucursal === 'all') {
            datos = [...datosCompletos['31pte'], ...datosCompletos['villas'], ...datosCompletos['nave'], ...datosCompletos['rioblanco']];
        } else if (sucursal) {
            datos = datosCompletos[sucursal] || [];
        } else {
            // No sucursal seleccionada, no mostrar nada
            return;
        }

        if(datos.length === 0){
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 12;
            td.className = "no-data";
            td.textContent = 'No hay registros para la sucursal seleccionada.';
            tr.appendChild(td);
            tbody.appendChild(tr);
            return;
        }

        datos.forEach(registro => {
            const tr = document.createElement('tr');
            const campos = ['noEmp', 'nombre', 'unidad', 'fechaGen', 'motivo', 'responsable', 'horasGen', 'fechasTomadas', 'horasTomadas', 'restante', 'actualizacion', 'observaciones'];
            campos.forEach(campo => {
                const td = document.createElement('td');
                td.textContent = registro[campo] || '';
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }

    function descargarExcel() {
        const sucursal = document.getElementById('sucursal').value;

        if (!sucursal) {
            alert('Por favor, seleccione una sucursal antes de descargar.');
            return;
        }

        let datos = [];
        if (sucursal === 'all') {
            datos = [...datosCompletos['31pte'], ...datosCompletos['villas'], ...datosCompletos['nave'], ...datosCompletos['rioblanco']];
        } else {
            datos = datosCompletos[sucursal] || [];
        }

        if(datos.length === 0){
            alert('No hay datos para descargar en la sucursal seleccionada.');
            return;
        }

        const wb = XLSX.utils.book_new();
        const encabezados = ["No. Emp.", "Nombre", "Unidad Laboral", "Fecha Horas Generadas", "Motivo", "Responsable", "Horas Generadas", "Fechas Tomadas", "Horas Tomadas", "Restante", "Última Actualización", "Observaciones"];
        const datosExcel = datos.map(d => [
            d.noEmp, d.nombre, d.unidad, d.fechaGen, d.motivo, d.responsable, d.horasGen, d.fechasTomadas, d.horasTomadas, d.restante, d.actualizacion, d.observaciones
        ]);
        datosExcel.unshift(encabezados);

        const ws = XLSX.utils.aoa_to_sheet(datosExcel);
        XLSX.utils.book_append_sheet(wb, ws, "Reporte");
        XLSX.writeFile(wb, `Reporte_Horas_${sucursal}.xlsx`);
    }

    // Carga datos automáticamente cuando cambia la sucursal
    document.getElementById('sucursal').addEventListener('change', (e) => {
        cargarDatos(e.target.value);
    });

    // Evento para descargar
    document.getElementById('descargarBtn').addEventListener('click', descargarExcel);

    // Inicializar sin mostrar datos al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        cargarDatos(''); // No muestra nada hasta que seleccione sucursal
    });
