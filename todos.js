Todos = new Meteor.Collection('todos');

if (Meteor.isClient) {
  Template.todos.helpers({
    todo: function(){
      return Todos.find({},{sort: {createdAt: -1}});
    }
  })

  Template.addTodo.events({
    'submit form': function (event) {
      event.preventDefault();
      var todoName=$('[name="todoName"]').val()
      Todos.insert({
        'name': todoName,
        'completed':false,
        'createdAt': new Date()
      }); 

      var todoName=$('[name="todoName"]').val('')

    }
  })

  Template.todoItem.events({
    'click .todo-delete': function (event) {
      event.preventDefault();
      var documentId = this._id;
      var confirm = window.confirm("You sure bruh ?")
      if (confirm){

        Todos.remove({_id: documentId}) ;
      }
    }
  })
}

if (Meteor.isServer) {
  //server side code goes here
}
