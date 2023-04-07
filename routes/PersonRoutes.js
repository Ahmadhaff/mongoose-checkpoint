const express = require('express');
const router = express.Router();
const Person = require('../models/person');


//creates a new Person document by saving the request body to the database using the Person model, and returns the created document.
router.post('/persons', async (req, res) => {
  
  try {
    const newPerson = new Person(req.body);
    await newPerson.save();
    res.status(200).json({msg:"success" , newPerson});
  } catch (err) { res.status(500).json({ msg: err.message })} 
  }); 
  
  // Array of people objects
const arrayOfPeople = [
    { name: 'Ahmad', age: 25, favoriteFoods: ['burrito', 'pasta'] },
    { name: 'Mary', age: 30, favoriteFoods: ['sushi', 'burrito'] },
    { name: 'Amine', age: 40, favoriteFoods: ['steak', 'chicken'] },
    { name: 'Riha', age: 40, favoriteFoods: ['couscous', 'michwi'] }
  ];
  
  // Route to create multiple people records
  router.post('/create-many-people', async (req, res) => {
    try {
      const arrayOfPeople = req.body;
      const people = await Person.create(arrayOfPeople);
      res.status(200).json(people);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });
  
// Route to find people by name

  router.get('/people/:name', async (req, res) => {
    const name = req.params.name;
    
    try {
      const people = await Person.find({ name: name });
      res.status(200).json({ msg: 'success', people });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });

// Route to find a person by favorite food
  router.get('/person/findOne/:food', async (req, res) => {
    const food = req.params.food;
  
    try {
      const person = await Person.findOne({ favoriteFoods: food }).exec();
      console.log(person);
      res.send(person);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
  

  // define a route to find a person by _id
router.get('/person/:id', async (req, res) => {
  const personId = req.params.id;

  try {
    const person = await Person.findById(personId);

    if (!person) {
      return res.status(404).send('Person not found');
    }

    res.send(person);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error finding person');
  }
});

// defines the route for a PUT request to update a person with the specified ID
router.put('/person/:personId', async (req, res) => {
  const personId = req.params.personId;

  try {
    const person = await Person.findById(personId);

    if (!person) {
      return res.status(404).send('Person not found');
    }

    person.favoriteFoods.push('hamburger');
    await person.save();

    res.send(person);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating person');
  }
});


// updates the age of a person with a given name in the database and returns the updated person object.
router.put('/people/:personName', function(req, res) {
  const personName = req.params.personName;

  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    function(err, updatedPerson) {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating person");
      } else {
        res.send(updatedPerson);
      }
    }
  );
});




// delete a person from a database using their ID
router.delete('/people/:id', async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndRemove(req.params.id);
    if (!deletedPerson) {
      return res.status(404).send('Person not found');
    }
    res.send(`Deleted person: ${deletedPerson.name}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

  

  
router.delete("/persons", async function(req, res) {
  try {
    // Use the remove() method on the Person model to delete all documents with the name "Mary"
    const result = await Person.remove({name: "Mary"});

    // Log the number of documents deleted
    console.log(result.deletedCount + " documents deleted");

    // Send a success response to the client
    res.status(200).json({message: "Successfully deleted all documents with name 'Mary'"});
  } catch (err) {
    // If there's an error, log it and send an error response to the client
    console.log(err);
    res.status(500).json({message: "Error deleting documents with name 'Mary'"});
  }
});


  

// find all persons who have "burrito" in their favorite foods list, then sort the result by name, limit the response to two records, and exclude the 'age' field.
router.get('/persons/burrito-lovers', async (req, res) => {
  try {
    const burritoLovers = await Person.find({ favoriteFoods: 'burrito' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec();
    res.json(burritoLovers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

  




module.exports = router;
