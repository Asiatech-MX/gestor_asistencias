document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const modal = document.getElementById('employeeModal');
  const closeButtons = document.querySelectorAll('.close');
  const btnAdd = document.getElementById('btnAdd');
  const btnCancel = document.querySelector('.btn-cancel');
  const form = document.getElementById('employeeForm');
  const tbody = document.getElementById('employeeTableBody');
  const btnClear = document.getElementById('btnClear');
  const btnImport = document.getElementById('btnImport');
  const btnExportExcel = document.getElementById('btnExportExcel');
  const btnExportPDF = document.getElementById('btnExportPDF');
  
  // Elementos para el modal de horarios
  const scheduleModal = document.getElementById('scheduleModal');
  const btnAddSchedule = document.getElementById('btnAddSchedule');
  const scheduleForm = document.getElementById('scheduleForm');
  const cancelAddSchedule = document.getElementById('cancelAddSchedule');

  // Datos
  let employees = [];
  let editIndex = null;

  // Renderizar la tabla de empleados
  function renderTable() {
    tbody.innerHTML = '';
    if (employees.length === 0) {
      tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;">No hay datos</td></tr>';
      return;
    }

    employees.forEach((e, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${e.nombre}</td>
        <td>${e.primerApellido} ${e.segundoApellido || ''}</td>
        <td>${e.email}</td>
        <td>${e.sucursal}</td>
        <td>${e.horario}</td>
        <td>${e.codigoFrappe || 'N/A'}</td>
        <td>${e.codigoChecador || 'N/A'}</td>
        <td class="actions">
          <button class="btn btn-success btn-edit" data-index="${employees.indexOf(e)}"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-delete" data-index="${employees.indexOf(e)}"><i class="fas fa-trash-alt"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Eventos para botones de editar
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        editIndex = btn.dataset.index;
        const emp = employees[editIndex];
        document.getElementById('employeeId').value = emp.id || '';
        document.getElementById('codigoFrappe').value = emp.codigoFrappe;
        document.getElementById('codigoChecador').value = emp.codigoChecador;
        document.getElementById('nombre').value = emp.nombre;
        document.getElementById('primerApellido').value = emp.primerApellido;
        document.getElementById('segundoApellido').value = emp.segundoApellido || '';
        document.getElementById('email').value = emp.email;
        document.getElementById('sucursal').value = emp.sucursal;
        document.getElementById('horario').value = emp.horario;
        document.getElementById('modalTitle').innerText = 'Editar Empleado';
        modal.style.display = 'flex';
      });
    });

    // Eventos para botones de eliminar
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        employees.splice(index, 1);
        renderTable();
      });
    });
  }

  // Función para actualizar automáticamente la tabla
  function autoRefreshTable() {
    setInterval(() => {
      renderTable();
    }, 30000); // Actualiza cada 30 segundos
  }

  // Eventos para el modal principal de empleados
  btnAdd.addEventListener('click', () => {
    editIndex = null;
    modal.style.display = 'flex';
    form.reset();
    document.getElementById('modalTitle').innerText = 'Agregar Empleado';
  });

  // Cerrar modales
  closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const modalToClose = this.closest('.modal');
      modalToClose.style.display = 'none';
    });
  });

  btnCancel.addEventListener('click', () => modal.style.display = 'none');
  
  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  // Evento para abrir modal de horarios
  btnAddSchedule.addEventListener('click', function(e) {
    e.preventDefault();
    scheduleModal.style.display = 'flex';
    scheduleForm.reset();
    document.querySelector('input[name="cruzaNoche"][value="si"]').checked = true;
    document.getElementById('horaEntrada').focus();
  });

  // Formulario para agregar nuevo horario
  scheduleForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const horaEntrada = document.getElementById('horaEntrada').value;
    const horaSalida = document.getElementById('horaSalida').value;
    const cruzaNoche = document.querySelector('input[name="cruzaNoche"]:checked').value;
    const descripcion = document.getElementById('descripcionHorario').value;

    const entradaFormatted = formatScheduleTime(horaEntrada);
    const salidaFormatted = formatScheduleTime(horaSalida);
    let horarioTexto = `${entradaFormatted} a ${salidaFormatted}`;
    
    if (descripcion) {
      horarioTexto += ` (${descripcion})`;
    }
    
    if (cruzaNoche === 'si') {
      horarioTexto += ' 🌙';
    }
    
    const horarioSelect = document.getElementById('horario');
    const option = document.createElement('option');
    option.value = horarioTexto;
    option.textContent = horarioTexto;
    horarioSelect.appendChild(option);
    
    horarioSelect.value = horarioTexto;
    scheduleModal.style.display = 'none';
    alert('Horario agregado correctamente');
  });

  // Evento para cancelar agregar horario
  cancelAddSchedule.addEventListener('click', function() {
    scheduleModal.style.display = 'none';
  });

  // Formulario principal de empleados
  form.addEventListener('submit', e => {
    e.preventDefault();

    const newEmp = {
      id: document.getElementById('employeeId').value || Date.now().toString(),
      codigoFrappe: document.getElementById('codigoFrappe').value,
      codigoChecador: document.getElementById('codigoChecador').value,
      nombre: document.getElementById('nombre').value,
      primerApellido: document.getElementById('primerApellido').value,
      segundoApellido: document.getElementById('segundoApellido').value,
      email: document.getElementById('email').value,
      sucursal: document.getElementById('sucursal').value,
      horario: document.getElementById('horario').value
    };

    if (editIndex !== null) {
      employees[editIndex] = newEmp;
    } else {
      employees.push(newEmp);
    }
    
    renderTable();
    modal.style.display = 'none';
    form.reset();
  });

  // Botón limpiar tabla
  btnClear.addEventListener('click', () => {
    if (confirm('¿Desea limpiar toda la tabla?')) { 
      employees = []; 
      renderTable(); 
    }
  });

  // Botón importar desde Excel
  btnImport.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls';
    input.onchange = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = ev => {
        const data = ev.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        
        sheet.forEach(row => {
          employees.push({
            id: Date.now().toString(),
            codigoFrappe: row['Código Frappe'] || '',
            codigoChecador: row['Código Checador'] || '',
            nombre: row['Nombre'] || '',
            primerApellido: row['Primer Apellido'] || '',
            segundoApellido: row['Segundo Apellido'] || '',
            email: row['Email'] || '',
            sucursal: row['Sucursal'] || '',
            horario: row['Horario'] || ''
          });
        });
        renderTable();
      };
      reader.readAsBinaryString(file);
    };
    input.click();
  });

  // Botón exportar a Excel
  btnExportExcel.addEventListener('click', exportToExcel);

  // Botón exportar a PDF
  btnExportPDF.addEventListener('click', exportToPDF);


  // Inicialización
  renderTable();
  autoRefreshTable();
});
