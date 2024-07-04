document.addEventListener('DOMContentLoaded', function () {
     const nombresInput = document.getElementById('nombre');
     const emailInput = document.getElementById('email');
     const passwordInput = document.getElementById('password'); // Selecciona el campo de contraseña
     const miFormulario = document.getElementById('miFormulario');

     function showNotification(message) {
          const notification = document.createElement('div');
          notification.classList.add('notification');
          notification.textContent = message;
          document.body.appendChild(notification);

          setTimeout(() => {
               notification.style.opacity = '0';
               setTimeout(() => {
                    notification.remove();
               }, 1000);
          }, 1000);
     }

     function redirectToPageWithLoader(url) {
          const loader = document.createElement('div');
          loader.classList.add('loader');
          document.body.appendChild(loader);

          setTimeout(() => {
               window.location.href = url;
               loader.remove();
          }, 500);
     }

     if (nombresInput) {
          nombresInput.addEventListener('input', function () {
               const value = this.value;
               if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
                    this.value = value.slice(0, -1);
                    alert('Solo se permiten letras y espacios en el campo de nombres');
               }
          });
     }

     if (emailInput) {
          emailInput.addEventListener('blur', function () {
               const value = this.value.trim();
               if (value && (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value))) {
                    alert('Ingrese un correo electrónico válido que contenga un punto (.) después de la arroba (@)');
               }
          });
     }

     if (miFormulario) {
          miFormulario.addEventListener('submit', function (event) {
               // Validación adicional antes de enviar el formulario
               const nombresValue = nombresInput.value.trim();
               const emailValue = emailInput.value.trim();
               const passwordValue = passwordInput.value; // Obtén el valor de la contraseña

               if (nombresValue === '') {
                    alert('El campo de nombres no puede estar vacío');
                    event.preventDefault();
               } else if (emailValue === '') {
                    alert('El campo de email no puede estar vacío');
                    event.preventDefault();
               } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailValue)) {
                    alert('Ingrese un correo electrónico válido');
                    event.preventDefault();
               } else if (passwordValue.length <= 5) { // Ajusta la condición para la longitud de la contraseña
                    alert('La contraseña debe tener más de 5 caracteres');
                    event.preventDefault();
               }
          });
     } else {
          console.error('El formulario no fue encontrado');
     }
});
