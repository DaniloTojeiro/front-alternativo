document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById("editProfileModal");
  
    const btn = document.getElementById("profile-edit-link");
  
    const span = document.getElementsByClassName("close")[0];
  
    function cleanModalInputs() {
      document.getElementById("editProfileForm").reset();
    } 
    btn.onclick = function(event) {
      event.preventDefault(); 
      modal.style.display = "block";
    }  
    span.onclick = function() {
      modal.style.display = "none";
      cleanModalInputs();
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        cleanModalInputs();
      }
    }
    document.getElementById("editProfileForm").onsubmit = function(event) {
      event.preventDefault();
      alert("Perfil atualizado!");
      modal.style.display = "none";
      cleanModalInputs();
    }
  });