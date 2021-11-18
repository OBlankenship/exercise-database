import * as exercises from './exercise_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the parameters provided in the body
 */
 app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json(error);
        });
});


/**
 * Retreives all exercises in the database
 */
 app.get('/exercises', (req, res) => {
    let filter = {};
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json(error);
        });

});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its attributes to those provided in the body
 */
 app.put('/exercises/:_id', (req, res) => {
    let conditions = { _id: req.params._id }
    let filter = {
        name: req.body.name, 
        reps: req.body.reps, 
        weight: req.body.weight, 
        unit: req.body.unit, 
        date: req.body.date
    }
    exercises.replaceExercise(conditions, filter)
        .then(numUpdated => {
            if (numUpdated) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, units: req.body.unit, date: req.body.date })
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json(error);
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
 app.delete('/exercises/:_id', (req, res) => {
    let conditions = { _id: req.params._id }
    exercises.deleteById(conditions)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json(error);
        });
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});