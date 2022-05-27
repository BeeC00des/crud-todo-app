import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms"
import { iTask } from '../model/task';
 

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  tasks: iTask[] = [];
  taskProgress: iTask[] = [];
  taskDone: iTask[] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false;



  constructor(private formb: FormBuilder ) { }

  ngOnInit(): void {
    this.todoForm = this.formb.group({
      item : ['', Validators.required]
    });
  }

  addTask(){
    this.tasks.push({
      description: this.todoForm.value.item,
      done:false
    })

    this.todoForm.reset();
  }

  deleteTask(i:number){
    this.tasks.splice(i , 1)
  }

  deleteTaskProgress(i:number){
    this.taskProgress.splice(i , 1)
  }

  deleteTaskDone(i:number){
    this.taskDone.splice(i , 1)
  }


  editTask(item:iTask, i:number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;

  }

  updateTask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }


  drop(event: CdkDragDrop<iTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
