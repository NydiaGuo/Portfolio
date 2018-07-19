jQuery(document).ready(function($) {
  "use strict";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAHJzN6AurNmr6w1psvu7HdjZtx9Qqln6I",
  authDomain: "portfolio-27ca1.firebaseapp.com",
  databaseURL: "https://portfolio-27ca1.firebaseio.com",
  projectId: "portfolio-27ca1",
  storageBucket: "",
  messagingSenderId: "1061051557269"
};

firebase.initializeApp(config);

//Create a variable to reference the database
var database = firebase.database();

// //Initial Values
var name = "";
var email = "";
var company = "";
var message = "";


  //Contact
  $('form.contactForm').submit(function() {
    
    event.preventDefault();
    console.log("message sent!");

    //Grabs user input
    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
    var company = $("#company").val().trim();
    var message = $("#message").val().trim();

    //Creates local "temporary" object for holding employer data
    var employer = {
      name: name,
      email: email,
      company: company,
      message: message
    };

    //Upolads employer data to the database
    database.ref().push(employer);

    //Clears all of the text after submiting
    $("#name").val("");
    $("#email").val("");
    $("#company").val("");
    $("#message").val("");

    //Validation for the submit form
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();

    return false;
  });

  //Create Firebase event for adding employer to the database
  // database.ref().on("child_added", function(childSnapshot) {
  //   // console.log(childSnapshot.val());
  //   return;
  // }, function(errs) {
  //   console.log("Erros handled: " + errs);
  // })
  
});
