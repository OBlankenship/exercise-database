// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database exercises in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/exercises",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

// Create operation
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
}


// Retreive operation 
const findExercises = async (filters, projection, limit) => {
    const query = Exercise.find()
        .select(projection)
        .limit(limit);
    if(filters.length > 0){
      query.and(filters);
    }
    return query.exec();
}

// Update operation
const replaceExercise = async (conditions, update) => {
    console.log(update);
    return Exercise.findOneAndUpdate(conditions, update); 
}

// Delete operation
const deleteById = async (filter) => {
    const result = await Exercise.deleteMany(filter);
    return result.deletedCount;
}
export { createExercise, findExercises, replaceExercise, deleteById };