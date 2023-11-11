import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function createFirstCapitalLetterValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
  
      const value = control.value;
  
      if (!value) {
        return null;
      }
  
      // Check if the first character is an uppercase letter
      const isFirstLetterUpperCase = /^[A-Z]/.test(value);
  
      return !isFirstLetterUpperCase ? {firstCapitalLetter: true} : null;
    };
  }