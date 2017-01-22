var Mailchimp = require('mailchimp-api-v3')
var admin = require("firebase-admin");
var mailchimp = new Mailchimp( ** YOUR MAILCHIMP API KEY ** );
admin.initializeApp({
    credential: admin.credential.cert( ** YOUR CERT FILE FROM FIREBASE ** ),
    databaseURL: "https://**YOUR FIREBASE URL**.firebaseio.com"
});
var db = admin.database();
var ref = db.ref("users");
ref.on("value", function(users) {
    users.forEach(function(user) {
        var userkey = user.key;
        var user = user.val();
        if (user.mailchimp === false) {
            var name = user.name;
            name = name.split(" ");
            var firstname = "";
            var lastname = "";
            if (name[1] !== undefined) {
                firstname = name[0];
                lastname = name[1];
            } else {
                firstname = name[0];
                lastname = "";
            }
            mailchimp.post('/lists/** YOUR LIST ID**/members', {
                    email_address: user.email,
                    status: 'subscribed',
                    "merge_fields": {
                        "FNAME": firstname,
                        "LNAME": lastname
                    }
                }).then(function(results) {
                    console.log('Adding firebase user ' + user.email + "(" + userkey + ")" + ' to the mailchimp list.');
                    ref.child(userkey).update({ mailchimp: true });
                })
                .catch(function(err) {
                    console.log(err);
                });
        };
    });
});