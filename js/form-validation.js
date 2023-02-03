let form = document.querySelector("#contact_form");
      form.addEventListener('submit', (e) => {
          e.preventDefault();
          var response = grecaptcha.getResponse();

          if(response.length == 0) {
            document.getElementById('msg').innerHTML = '<span style="color:red;">Valida el CAPTCHA.</span>';
            
            return false;
          }

          let data = new FormData(form);

          var name = data.get('name');
          var email = data.get('email');
          var subject = data.get('subject');
          var message = data.get('message');

          if(name && email && subject && message){          

          document.querySelector("#sub").value = "Enviando...";
          fetch('https://script.google.com/macros/s/AKfycbxNWHlHSTMD0nc7E-g1QlmJqPxL4PsiICLgOvz3rAVFRDX-WOhBhSQ__xE-fnEFJnZTQA/exec', {
                  method: "POST",
                  body: data
              })
              .then(res => res.text())
              .then(data => {
                  document.querySelector("#msg").innerHTML = data;
                  document.querySelector("#sub").value = "Enviar";
                  form.reset();
                  grecaptcha.reset();
                  
                  
              });         

          }else{
            document.getElementById('msg').innerHTML = '<span style="color:red;">Revisa los campos.</span>';

          }


      })
      