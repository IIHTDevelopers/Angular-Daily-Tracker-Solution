import { Component } from '@angular/core';

interface Exercise {
  id: number;
  name: string;
  time: string;
  caloriesBurned: number;
}

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  exercises: Exercise[] = [];
  newExercise: Exercise = {} as Exercise;
  editedExercise: Exercise = {} as Exercise;
  isEditing = false;
  searchKeyword = '';

  addExercise(): void {
    this.newExercise.id = this.exercises.length + 1;
    this.exercises.push({ ...this.newExercise });
    this.newExercise = {} as Exercise;
  }

  editExercise(exercise: Exercise): void {
    this.isEditing = true;
    this.editedExercise = { ...exercise };
  }

  saveEditedExercise(): void {
    const index = this.exercises.findIndex(exercise => exercise.id === this.editedExercise.id);
    if (index !== -1) {
      this.exercises[index] = { ...this.editedExercise };
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedExercise = {} as Exercise;
  }

  deleteExercise(exercise: Exercise): void {
    this.exercises = this.exercises.filter(item => item.id !== exercise.id);
  }

  get filteredExercises(): Exercise[] {
    return this.exercises.filter(exercise =>
      exercise.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}

