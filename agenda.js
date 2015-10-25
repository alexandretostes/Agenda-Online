Contatos = new Mongo.Collection('contatos');


if (Meteor.isClient) {
   Session.setDefault('filtro', {});
  Template.listContato.helpers({
    'contatos': function() {
      var filtro = {}, sess = Session.get('filtro');
      for (var prop in sess) {
        if (typeof sess[prop] == 'string') {
          filtro[prop] = new RegExp(sess[prop], 'i');
        }
        else {
          filtro[prop] = sess[prop];
        }
      }
      return Contatos.find(filtro);
    }
   });

  Template.listContato.events({
    'click .deletar': function() {
      Contatos.remove({_id: this._id});

    },
    'click .editar':  function(){
      $('.modal').modal("show");
      var form = $('form.modal').get(0);

      form.id.value = this._id;
      form.nome.value = this.nome;
      form.email.value = this.email;
      form.ddd.value = this.ddd;
      form.telefone.value = this.telefone;
      form.tipo.value = this.tipo;
      
    }

  });

  Template.addContato.events({
    'submit form': function(event) {
      event.preventDefault();

      var form = event.target;

      var dados = {
        nome: form.nome.value,
        email: form.email.value,
        ddd: form.ddd.value,
        telefone: form.telefone.value,
        tipo: form.tipo.value
      };

      if (form.id.value) {
        Contatos.update({_id: form.id.value}, dados);
      }
      else {
        Contatos.insert(dados);
      }
      
      form.id.value = '';

      $('.modal').modal("hide");
    }
  });

  Template.body.events({
    'click .addContato': function(){
          $('.modal').modal("show");

      },
      "keyup #search": function(event){
        if(event.target.value){
          Session.set('filtro', {nome: event.target.value});
        }
        else {
          Session.set('filtro', {});
        }

      } 

  });
}

if (Meteor.isServer) {
  //Contatos.remove({nome: "Alejandro"});
}

/*
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
*/