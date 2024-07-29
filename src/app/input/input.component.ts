import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core'; 
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import * as yup from 'yup'; 
import { ListItemStore } from '../store/list-item.store';
import { Store } from '@ngrx/store';

export function yupFormValidator(schema: yup.AnySchema): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control && control.value) {
      try {
        schema.validateSync(control.value, { abortEarly: false });
        return null;
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          // Collect errors and format them for Angular form control
          const validationErrors = error.inner.reduce((errors: any, err: yup.ValidationError) => {
            if (err.path) {
              errors[err.path] = err.message;
            }
            return errors;
          }, {});
          return validationErrors ;
        }
        return { yup: 'Validation failed' };
      }
    }
    return null;
  };
}                                                                                                                                                 

const validationSchema = yup.object().shape({
  name : yup.string().required('Name is required').max(20,'Maximum of 20 characters')
});
 

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  itemForm = inject(FormBuilder).group({
    name : ['']
  }, { validators : yupFormValidator(validationSchema) });

  isSubmitedSignal = signal<boolean>(false); 

  listItemStore = inject(ListItemStore); 

  /**
   *
   */
  constructor(private store : Store) { 
  }

  getErrors(field: string) {
    
    let errorsResult : any = this.itemForm.errors;
    if(!errorsResult){
      return null;
    }

    return errorsResult[field];
  } 

  onSubmit(){
    this.isSubmitedSignal.set(true); 

    if (this.itemForm.valid) {
      // Submit form logic
      this.listItemStore.addItem(this.itemForm.value.name ?? ''); 

    }
    
  }

}
