if (Meteor.isClient) {
  // counter starts at 0
  //Session.setDefault('counter', 0);

  Template.helloWorld.helpers({
    counter: function () {
      return Session.get('counter');
    },
    pictures: function(){
      return myColl.find({}, {sort:{time:1}});
    }
  });

  Template.helloWorld.events({
    'click button': function () {
      var uploadCount;
      // increment the counter when button is clicked
      //Session.set('counter', Session.get('counter') + 1);
      MeteorCamera.getPicture({}, function(e, r){
        if(e){
          alert(e.message);
        }else{
          console.log(r);
          myColl.insert({time:new Date(), pic:r});
          uploadCount = (Session.get('counter')||0);
          uploadCount += 1;
          Session.set('counter', uploadCount);
        }
      })

    }
  });
}

