import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FridgeComponent } from './fridge/fridge.component';
import { MealsComponent } from './meals/meals.component';
import { UserInputComponent } from './user-input/user-input.component';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser/src/dom/events/hammer_gestures';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'about/:id',
    component:AboutComponent
  },
  {
    path:'fridge',
    component:FridgeComponent
  },
  {
    path:'meals',
    component:MealsComponent
  },
  {
    path:'userInput',
    component:UserInputComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
