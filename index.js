function addActivity(name) {
      const activities = JSON.parse(localStorage.getItem('activities')) || [];

      const newActivity = {
        id: Date.now(),
        name: name
      };
      
      activities.push(newActivity);

      localStorage.setItem('activities', JSON.stringify(activities));

      document.getElementById('activityName').value = '';

      getActivities();
}
    
// DELETE
function deleteActivity(id) {
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
      
    const updatedActivities = activities.filter(function(activity) {
      return activity.id !== id;
    });
      
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
      
    getActivities();
}
    
// EDIT
function editActivity(id, newName) {

  const activities = JSON.parse(localStorage.getItem('activities')) || [];
      
  activities.forEach(function(activity) {

    if (activity.id === id) {
      activity.name = newName;
    }
});
      
  localStorage.setItem('activities', JSON.stringify(activities));
      
  getActivities();
}
    
// READ
function getActivities() {
      const activities = JSON.parse(localStorage.getItem('activities')) || [];
      
      const tableBody = document.querySelector('#activityTable tbody');
      tableBody.innerHTML = '';
  
      activities.forEach(function(activity) {

        const row = document.createElement('tr');
        const nameCell = document.createElement('td');

        nameCell.textContent = activity.name;
        
        row.appendChild(nameCell);
  
        const actionsCell = document.createElement('td');
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'btn btn-sm btn-primary me-2';
        editButton.addEventListener('click', function() {
          const newName = prompt('Ingrese el nuevo nombre de la actividad', activity.name);
          if (newName !== null && newName.trim() !== '') {
            editActivity(activity.id, newName);
          }
        });
        actionsCell.appendChild(editButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'btn btn-sm btn-danger';
        deleteButton.addEventListener('click', function() {
          deleteActivity(activity.id);
        });
        actionsCell.appendChild(deleteButton);
  
        row.appendChild(actionsCell);
        tableBody.appendChild(row);
      });
    }
    
    // Función para descargar las notas en un archivo de texto
    function downloadNotes() {
      const activities = JSON.parse(localStorage.getItem('activities')) || [];
      
      const notesContent = '';
      activities.forEach(function(activity) {
        notesContent += activity.name + '\n';
      });
      
      const blob = new Blob([notesContent], {type: 'text/plain'});
      const downloadLink = document.createElement('a');
      downloadLink.download = 'notas.txt';
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.click();
    }
    
    // Manejador de evento para el formulario
    document.getElementById('activityForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const activityName = document.getElementById('activityName').value;
      addActivity(activityName);
    });
    
    // Manejador de evento para el botón de descarga de notas
    document.getElementById('downloadButton').addEventListener('click', function() {
      downloadNotes();
    });
    
    // Obtener las actividades almacenadas al cargar la página
    getActivities();