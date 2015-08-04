Todos = new Meteor.Collection('todos');

if (Meteor.isClient) {
    Template.todos.helpers({
        todo: function() {
            return Todos.find({}, {
                sort: {
                    createdAt: -1
                }
            });
        }
    });

    Template.addTodo.events({
        'submit form': function(event) {
            event.preventDefault();
            var todoName = $('[name="todoName"]').val();
            Todos.insert({
                'name': todoName,
                'completed': false,
                'createdAt': new Date()
            });

            //noinspection JSDuplicatedDeclaration
            $('[name="todoName"]').val('');

        }
    });

    Template.todoItem.events({
        'click .todo-delete': function(event) {
            event.preventDefault();
            var documentId = this._id;
            var confirm = window.confirm("You sure bruh ?");
            if (confirm) {

                Todos.remove({
                    _id: documentId
                });
            }
        },

        'keyup [name=todoItem]': function(event) {
            if (event.which == 13 || event.which == 27) {
                $(event.target).blur();
            } else {
                var todoItem = $(event.target).val();
                var documentId = this._id;
                Todos.update({
                    _id: documentId
                }, {
                    $set: {
                        'name': todoItem
                    }
                });
            }
        },

        'change [type=checkbox]': function() {
            console.log("you have toggled the checkbox");
            var documentId = this._id;
            var isCompleted = this.completed;
            if (isCompleted) {
                Todos.update({
                    _id: documentId
                }, {
                    $set: {
                        completed: false
                    }
                });

            } else {
                Todos.update({
                    _id: documentId
                }, {
                    $set: {
                        completed: true
                    }
                });
            }
        }
    });
}

if (Meteor.isServer) {
    //server side code goes here
}
